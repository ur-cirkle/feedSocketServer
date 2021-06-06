//calling the library for the unique id generation
const { uid } = require("uid");

//making the function to store the data
const addBlog = async ({ data, db, io }) => {
  const{blog,userid} = data;

    let sql;

    //** creating postid that will be stored in database */
    const blogid = uid(11);
    
    sql = `insert into add_blog(userid,blogid,title) values('${userid}','${blogid}','${blog}');`
  
    const [answer1] =  await db.query(sql);

    sql = `insert into interest_tag values`

    for(let tag of interesttag){
       sql+=`('${tag}','${blogid}'),`
    }
    
    const [adding_interesttag] = await db.query(sql);

    
    sql = `select * from (select * from(select * from (select * from  all_connection where status = success and (all_connection.connectorid = '${userid}'  or all_connection.connecteeid = '${userid}')) as c1 ,user_details where (user_details.userid = c1.connectorid or user_details.userid = c1.connecteeid ) and user_details.acc_type =personal) as c2 inner join device_connection on c2.userid = device_connection.userid) as c3 inner join users_socketid on user_socketid.deviceid = device_connection.deviceid;`
    const [names,column] = await db.query(sql);
    
    sql = `select * from user_details where userid = '${userid}'`

    const[phototaking,column] = await db.query(sql);

    const photoid = phototaking[0].image;

    for(naming of names){
          
    socket.to(naming.socketid).emit("sendingblog",{storingFileLink,caption,location,interesttag,taggedUser,username,userid,photoid})

    }
};

module.exports = addBlog;
