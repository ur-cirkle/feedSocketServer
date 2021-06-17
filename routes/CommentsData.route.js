const CommentsData = async({data,db,io,socket})=>{

const {id,offset} = data;

let sql;

sql = `select * from(select * from (SELECT * FROM nurturing_comment where parentid='${id}' LIMIT 10 OFFSET '${offset}')  as c1 inner join all_commentid on all_commentid.childid = c1.parentid) as c2 inner join all_user on all_user.userid = c2.userid  ;`

const[userCommentADnDetail,column] = await db.query(sql);

socket.emit("sendingCommentData",{userCommentADnDetail})

}


module.exports = CommentsData;