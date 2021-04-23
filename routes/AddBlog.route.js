const AddBlog = async ({ data, db, io }) => {
  const { body, userid, title } = data;
  await db("all_blogs").insert({
    userid,
    body,
    title,
  });
};
module.exports = AddBlog;
