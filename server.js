//* Pakage Imports
const http = require("http").createServer();
const mysql = require("mysql2");
const momenttz = require("moment-timezone");
const moment = require("moment");
const { uid } = require("uid");

const io = require("socket.io")(http, {
  reconnect: true,
});

//* Routes
const userConnection = require("./routes/userConnection.route");
const addBlog = require("./routes/addBlog.route");
const blogPostLike = require("./routes/blogPostLike.route");
const CommentsData = require("./routes/CommentsData.route")
const GettingUserAllData = require("./routes/GettingUserAllData.route")
const connectingUsers = require("./routes/connectingUsers.routes")
//* Utils
const timeCalc = require("./utils/timeCalc");
const newBlogPostLike = require("./routes/blogPostLike.route");
//* Connecting Database
const pool = mysql.createPool({
  host: "localhost",
  database: "ur_cirkle",
  user: "root",
  password: "1234567890",
  port: 3306,
});
const db = pool.promise();

console.log(timeCalc("2021-05-06 23:25:35", "America/Los_Angeles"));
const users = {};
io.on("connection", (socket) => {
  socket.on("user_connection", (data) =>
    userConnection({ data, db, io, users, socket })

  );
  socket.on("add-blog", (data) => addBlog({ data, db, io }));
  socket.on("blogpost-like", async (data) =>
    blogPostLike({ data, db, io, socket })

  );

//here the socket likescount is for getting the request of likes from the user and then send the data to the frontend
socket.on('likescount',async(data)=>{
  blogPostLike({ data, db, io, socket })

});


// here the socket getting data of bio for the particular person
socket.on('geettingalldataofperson',async(data)=>{
  GettingUserAllData({ data, db, io, socket })
})


//here the socket will emit the comment data of particular post
  socket.on("givedatatocomment",async(postid)=>{
   
    CommentsData({postid,db,io,socket});
   
  })


  //here the socket will gives the data 
  socket.on("connectivity",async(data)=>{
   
    connectingUsers({data,db,io,socket})
  })

  socket.on("disconnect", async () => {
    if (users[socket.id]) {
      console.log(`${users[socket.id].userid} disconnected`);
      await db.query(
        `UPDATE users_socketid SET socketid=NULL WHERE userid='${
          users[socket.id].userid
        }'`
      );
    }
    // remove saved socket from users object
    delete users[socket.id];
  });
});



// const checking = async()=>{
//   data1 = "QUOisrFXVC";
//   let sql = `select * from blogpost_comments where blogpost_comments.receiverid = '${data1}';`
//   const [initial_post_comments_data,column1] = await db.query(sql)

// var x;

// for (x in initial_post_comments_data ){

//   sql =`select * from likes_count where likes_count.id = '${initial_post_comments_data[x].commentid}';`

//   const[row4,column4] = await db.query(sql);
  
//   initial_post_comments_data[x]['likes'] = row4[0].counting;

  

// }

// const post_comment = [];
// post_comment.unshift(...initial_post_comments_data);
//  creating_object_storing_connection = {}
//  let count = 0;
   
//     while (initial_post_comments_data.length>0) {
        
//         sql = `select *from  comments_replies where comments_replies.parentid= '${initial_post_comments_data[0].commentid}';`
//         const [getting_likes,column2] = await db.query(sql);
    
//         for (x in getting_likes){

//         sql =`select * from likes_count where likes_count.id = '${getting_likes[x].commentid}';`
//         const[post_comment,column3] = await db.query(sql);
//         getting_likes[x]['likes'] = post_comment[0].counting;

//         }

//         creating_object_storing_connection[initial_post_comments_data[0].commentid] = getting_likes;
        

        
//         initial_post_comments_data.shift();
        
//         if (getting_likes!=[]){
//           initial_post_comments_data.unshift(...getting_likes);
//         }

      
//     }
    
//     console.log(post_comment,creating_object_storing_connection);

// }
// const getting_like_request = async()=>{
//       let personid = "wtXKCzHnoJ";
//       let type2 = "comment";
//       let commentid1 = "CefJgztTkn";
//       let type1 =1;  
              
   
//      let sql = `select checking_person_comment('${personid}','${type2}','${commentid1}',${type1}) as c1;`
      
//      const [getting_likes,column2] = await db.query(sql);

//       console.log(getting_likes);
        

// }
// getting_like_request();
const port = process.env.PORT || 3003;

http.listen(port, () => console.log(`Server running on port ${port} 🔥`));


