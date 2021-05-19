
const connectingUsers = async({ data, db, io, socket })=>{

const{userid,receiverid,type} = data;
let sql;
if (type=="sent"){
 sql = `select ur_cirkle.sending('${userid}','${receiverid}');`;
 const [row] =  await db.query(sql);

 socket.emit("position",row[0].finding)
}
else{
if(type=="ignore"){
  sql  = `update all_connections set status = 'ignore' where connecteeid = '${receiverid}' and connectorid = '${userid}';`
  const [row] =  await db.query(sql);
 
  row==[]?socket.emit("position",200):socket.emit("position",404);
}
else{

    sql = `update all_connection set status = 'success' where connecteeid = '${receiverid}' and connectorid = '${userid}';`

    const [row] =  await db.query(sql);
 
  row==[]?socket.emit("position",200):socket.emit("position",404);
 
}
}

}