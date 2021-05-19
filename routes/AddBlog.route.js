//calling the library for the unique id generation
const { uid } = require("uid");

//making the function to store the data
const addBlog = async ({ data, db, io }) => {
  const { blog, userid } = data;
  //blog =  data.blog // here the blog data will be come which include html tags and writtings also
  //userid = data.userid // here person who had written the blog his id will come
  // generating particular blogs unique id
  const blogid = uid(12);
  // if anything in data is missing then it will not proceed
  if (!blog || !userid) return;

  // if everyting goes  properly then it will run query
  await db.query(
    `INSERT INTO all_blogposts(id,userid,type,text) VALUES('${blogid}','${userid}','blog','${blog}')`
  );
};

module.exports = addBlog;
