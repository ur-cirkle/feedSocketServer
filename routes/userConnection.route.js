const userConnection = async ({ data, users, io, db, socket }) => {
  const { deviceid, currentPosition } = data;

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
  console.log(user);
  users[socket.id] = {
    userid,
    currentPosition,
  };
};
module.exports = userConnection;
