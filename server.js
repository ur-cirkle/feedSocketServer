const http = require("http").createServer();
const knex = require("knex");
const { uid } = require("uid/secure");
const io = require("socket.io")(http, {
  reconnect: true,
});

const db = knex({
  client: "mysql2",
  connection: {
    host: "localhost",
    user: "root",
    password: "1234567890",
    database: "test_db",
    port: 3306,
  },
});
db.schema.hasTable("private_messages").then(function (exists) {
  if (!exists) {
    return db.schema.createTable("private_messages", function (t) {
      t.increments("id").primary();
      t.string("sender", 100);
      t.string("receiver", 100);
      t.string("text");
      t.string("chatid");
      t.string("accepted_by");
      t.string("seen_by");
      t.timestamp("created_at").defaultTo(db.fn.now());
    });
  }
});
const postsandblogs = {};
io.on("connection", (socket) => {
  console.log("connected", Date());
  socket.on("new-post", (data) => {
    postsandblogs[data.id] = data;
    socket.emit("post", data);
  });
  socket.on("new-blog", (data) => {
    db("all_blogs").insert();
  });
  socket.on("new-like", (data) => {
    postsandblogs[data.id]["likes"] = postsandblogs[data.id]["likes"]++;
    socket.emit("like", postsandblogs[data.id]);
  });
  socket.on("new-comment", (data) => {
    postsandblogs[data.id]["comments"][data.comment.id] = data.comment;
  });
});
const port = process.env.PORT || 4000;

http.listen(port, () => {
  console.log("server connected");
});
