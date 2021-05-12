const CommentsData = async({postid,db,io,socket})=>{


let sql = `select * from blogpost_comments where blogpost_comments.receiverid = '${postid}';`
const [initial_post_comments_data,column1] = await db.query(sql)

var x;

for (x in initial_post_comments_data ){

   sql =`select * from likes_count where likes_count.id = '${initial_post_comments_data[x].commentid}';`

  const[row4,column4] = await db.query(sql);

initial_post_comments_data[x]['likes'] = row4[0].counting;



}

const post_comment = [];
post_comment.unshift(...initial_post_comments_data);
creating_object_storing_connection = {}
let count = 0;
 
  while (initial_post_comments_data.length>0) {
      
      sql = `select *from  comments_replies where comments_replies.parentid= '${initial_post_comments_data[0].commentid}';`
      const [getting_likes,column2] = await db.query(sql);
  
      for (x in getting_likes){

      sql =`select * from likes_count where likes_count.id = '${getting_likes[x].commentid}';`
      const[post_comment,column3] = await db.query(sql);
      getting_likes[x]['likes'] = post_comment[0].counting;

      }

      creating_object_storing_connection[initial_post_comments_data[0].commentid] = getting_likes;
      

      
      initial_post_comments_data.shift();
      
      if (getting_likes!=[]){
        initial_post_comments_data.unshift(...getting_likes);
      }

    
  }
  
socket.emit('sendingscommentdata',(initial_post_comments_data,creating_object_storing_connection))

}

module.exports = CommentsData;