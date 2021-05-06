//* Pakage Imports
const http = require("http").createServer();
const mysql = require("mysql2");
const { uid } = require("uid");
const io = require("socket.io")(http, {
  reconnect: true,
});

//* Routes

//* Connecting Database
const pool = mysql.createPool({
  host: "localhost",
  database: "ur_cirkle",
  user: "root",
  password: "1234567890",
  port: 3306,
});
const db = pool.promise();
//* Online Users
const users = {};
io.on("connection", (socket) => {
  socket.on("user_connection", async (data) => {
    const { userid, currentPosition } = data;

    if (!userid || !currentPosition) return;
    const [user] = await db.query(
      `SELECT all_users.userid AS userid,socketid FROM all_users JOIN users_socketid ON all_users.userid = users_socketid.userid WHERE all_users.userid='${userid}'`
    );
    if (user.length > 0) {
      await db.query(
        `UPDATE users_socketid SET socketid = '${socket.id}' WHERE userid ='${userid}'`
      );
    } else {
      await db.query(
        `INSERT INTO users_socketid(userid, socketid) VALUES('${userid}','${socket.id}')`
      );
    }
    users[userid] = {
      socketid: socket.id,
      currentPosition,
    };
  });
  socket.on("add-blog", async (data) => {
    const { blog, userid } = data;
    const blogid = uid(13);
    if (!blog || !userid) return;
    await db.query(
      `INSERT INTO all_blogs(blogid,userid,blog) VALUES('${blogid}','${userid}','${blog}')`
    );
  });
});
const port = process.env.PORT || 3003;

http.listen(port, () => console.log(`Server running on port ${port} 🔥`));
