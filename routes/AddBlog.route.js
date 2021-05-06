const { uid } = require("uid");
const addBlog = async ({ data, db, io }) => {
  const { blog, userid } = data;
  const blogid = uid(12);
  if (!blog || !userid) return;
  await db.query(
    `INSERT INTO all_blogposts(id,userid,type,text) VALUES('${blogid}','${userid}','blog','${blog}')`
  );
};

module.exports = addBlog;
