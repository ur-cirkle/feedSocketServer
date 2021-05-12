const { uid } = require("uid");

const newBlogPostLike = async ({ data, db, io, socket }) => {
  const[personid,type2,commentid1,type1] = data;
   
  // gist of upper code
 // personid = data.personid;// getting user id 
 // type2 = data.type2;// It should only include comment or (post,blog)
 // commentid1 = data.commentid1;// I t should include commentid
 // type1 =data.type1;  // It should include binary value in which 0 represent notliked  and 1 represent dislike
         
/// writting the query that will bring the data of this particular post or comment current likes 
let sql = `select checking_person_comment('${personid}','${type2}','${commentid1}',${type1}) as c1;`  

// here is the function checking_person_comment is used to bring the data of current likes on post or blog or comment 

//function is below this  please comment it out if you want it 

// CREATE DEFINER=`root`@`localhost` FUNCTION `checking_person_comment`(personid varchar(11),type2 varchar(12),commentid1 varchar(13),type1 boolean) RETURNS int
//     READS SQL DATA
//     DETERMINISTIC
// BEGIN
// declare c1 int default 0;
// declare totallikes int default 0;
// if (type2='comment') then 
// select count(*) into c1 from comment_likes where comment_likes.commentid = commentid1 and comment_likes.userid = personid;
// if (c1=0) then 

//    insert into comment_likes values( personid ,commentid1,current_timestamp,type);
// else
//    update  comment_likes set  type = type1  where  userid = personid and  commentid = commentid1;
//    end if;
// else
//  select count(*) into c1 from blogpost_likes where (receiverid = commentid1  and  userid = personid);
//  if(c1 =0) then 
//      insert into blogpost_likes values(personid,commentid1,current_timestamp,type1);
// else
//      update  blogpost_likes set  type = type1  where ( userid = personid and  receiverid = commentid1);
// end if;
// end if;
// select counting into totallikes from likes_count where id = commentid1;
// RETURN totallikes;
// END


  

// calling from the database 
const [getting_likes,column2] = await db.query(sql);


// emitting data to the user of likes on the particular post or blog 
socket.emit('likesdatalivecounter',getting_likes[0].c1);
};
module.exports = newBlogPostLike;
