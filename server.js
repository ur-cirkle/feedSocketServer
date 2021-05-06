//* Pakage Imports
const http = require("http").createServer();
const mysql = require("mysql2");
const momenttz = require("moment-timezone");
const moment = require("moment");
const { uid } = require("uid");
const io = require("socket.io")(http, {
  reconnect: true,
});

//* Routes
const userConnection = require("./routes/userConnection.route");
const addBlog = require("./routes/addBlog.route");
const blogPostLike = require("./routes/blogPostLike.route");
//* Utils
const timeCalc = require("./utils/timeCalc");
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
console.log(timeCalc("2021-05-06 23:25:35", "America/Los_Angeles"));
const users = {};
io.on("connection", (socket) => {
  socket.on("user_connection", (data) =>
    userConnection({ data, db, io, users, socket })
  );
  socket.on("add-blog", (data) => addBlog({ data, db, io }));
  socket.on("blogpost-like", async () =>
    blogPostLike({ data, db, io, socket })
  );
  socket.on("disconnect", async () => {
    if (users[socket.id]) {
      console.log(`${users[socket.id].userid} disconnected`);
      await db.query(
        `UPDATE users_socketid SET socketid=NULL WHERE userid='${
          users[socket.id].userid
        }'`
      );
    }
    // remove saved socket from users object
    delete users[socket.id];
  });
});
const port = process.env.PORT || 3003;

http.listen(port, () => console.log(`Server running on port ${port} 🔥`));
