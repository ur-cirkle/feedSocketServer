const {uid} = require('uid');

const commentsDataRoute = async({socket,db,data})=>{

   const{parentid,userid,postid,comment} = data;
   const childid = uid(11);
   sql = `insert into all_commentid values('${childid}','${userid}','${comment}');`

   const[storingCommentId] =  await query(sql);

   sql = `insert into nurturing_comment values('${parentid}','${childid}');`

   const[storingNurturing] =await query(sql);

   if(parentid!=postid){

   sql=`select userid from all_commentid = '${parentid}';`

   const[findingUserId,column] =  await query(sql);


   let userIdFinded = findingUserId[0].userid;


   sql = `select userid from all_commentid = '${postid}';`

   const[gettingPostUser,column1] = await query(sql);

   let postUserid =  gettingPostUser[0].userid;

   const storingname = [postUserid,userIdFinded];

   sql = `select username from all_user where userid ='${userid}';`

   const [fetchingUsername,column] = await query(sql);

   const username = fetchingUsername[0].username;

   sql = `select c1.userid,socket_id.socketid from(select * from device_connection where userid = (?)) as c1 inner join socket_id on socket_id.deviceid= c1.deviceid;`

   const [user_socketid,column2] = await query(sql,storingname);

   for(user of user_socketid){
       socket.to(user.socketid).emit("sendingCommentToThepeople",{comment,username});
   }

   }
   else{

    sql = `select userid from all_commentid = '${postid}';`
 
    const[gettingPostUser,column1] = await query(sql);
 
    let postUserid =  gettingPostUser[0].userid;
 
    const storingname = [userIdFinded];
 
    sql = `select username from all_user where userid ='${userid}';`
 
    const [fetchingUsername,column] = await query(sql);
 
    const username = fetchingUsername[0].username;
 
    sql = `select c1.userid,socket_id.socketid from(select * from device_connection where userid = (?)) as c1 inner join socket_id on socket_id.deviceid= c1.deviceid;`
 
    const [user_socketid,column2] = await query(sql,storingname);
 
    for(user of user_socketid){
        socket.to(user.socketid).emit("sendingCommentToThepeople",{comment,username});
    }
 

   }
   1

}

module.exports =  commentsDataRoute; 