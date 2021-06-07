const GettingUserAllData = async({ data, db, io, socket })=>{
    const[type1,userid1] =  data;
    let sql = `call ur_cirkle.new_procedure(${type1}, '${userid1}');`
    const [data_taken,column] = await db.query(sql);
  socket.emit("DataOfThePerson",data_taken);
}
module.exports = GettingUserAllData