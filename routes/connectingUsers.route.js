const connectingUsers = async ({ data, db, io, socket }) => {
  const { userid, receiverid, type, acc_type } = data;
  let sql;
  console.log("hjj");
  const [socketid] = await db.query(
    `SELECT * FROM users_socketid WHERE userid ='${receiverid}' OR userid = '${userid}' `
  );
  const socketids = {};
  for (user of socketid) {
    socketids[user.userid] = user.socketid;
  }
  console.log(socketids, socketids[userid]);
  if (type == "new") {
    sql = `select ur_cirkle.sending('${userid}','${receiverid}',${acc_type}) as finding;`;

    const [row] = await db.query(sql);
    console.log(row);
    socket.emit("position", row[0].finding);
    socket.to(socketids[receiverid]).emit("position", row[0].finding);
  } else {
    if (type == "ignore") {
      sql = `update all_connections set status = 'ignore' where connecteeid = '${receiverid}' and connectorid = '${userid}';`;
      const [row] = await db.query(sql);

      row == []
        ? socket.to(socketids[receiverid]).emit("position", 200)
        : socket.to(socketids[receiverid]).emit("position", 404);
    } else if (type == "accept") {
      sql = `update all_connection set status = 'success' where connecteeid = '${receiverid}' and connectorid = '${userid}';`;
      const [row] = await db.query(sql);
      row == []
        ? socket.to(socketids[userid]).emit("position", 200)
        : socket.to(socketids[userid]).emit("position", 404);
      row == []
        ? socket.to(socketids[receiverid]).emit("position", 200)
        : socket.to(socketids[receiverid]).emit("position", 404);
    } else {
    }
  }
};
module.exports = connectingUsers;
