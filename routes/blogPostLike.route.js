const { uid } = require("uid");

const newBlogPostLike = async ({ data, db, io, socket }) => {
  const { userid, type, receiverid } = data;
  const [like] = await db.query(
    `SELECT * FROM blogpost_likes WHERE userid='${userid}' AND receiverid='${receiverid}'`
  );
  if (like.length > 0) {
    await db.query(
      `INSERT INTO blogpost_likes (id,userid,type,receiverid) 
      VALUES('${uid(14)}','${userid}','${type}','${receiverid}')`
    );
  } else {
    await db.query(
      `DELETE FROM blogpost_likes WHERE userid ='${userid}' AND receiverid='${receiverid}'`
    );
    io.to(socket.id).emit("blogpost-noti", {
      type: "remove like",
      content: {
        receiverid,
        userid,
      },
    });
  }
};
module.exports = newBlogPostLike;
