const addPost = async ({ socket, io, db, data }) => {
  const {
    taggedUser,
    images,
    userid,
    username,
    caption,
    interesttag,
    location,
  } = data;

  let sql;

  //** creating postid that will be stored in database */
  const postid = uid(11);

  sql = `insert into add_post(userid,postid,caption,location) values('${userid}','${postid}','${caption}','${location}');`;

  const [answer1] = await db.query(sql);

  sql = `insert into interest_tag values`;

  for (let tag of interesttag) {
    sql += `('${tag}','${postid}')`;
  }

  const [adding_interesttag] = await db.query(sql);

  const storingFileLink = [];

  let url;

  for (let image of images) {
    await cloudinary.uploader.upload(image, (err, result) => {
      if (err)
        return socket.emit("failed", {
          clouderror: "can not upload on cloud the image",
        });
      url = result.url;
    });

    storingFileLink.push(url);

    sql = `insert into posturl(url,imagetype,postid) values ('${url}','${image.type}','${postid}');`;

    const [answer] = await db.query(sql);
  }

  sql = `select * from (select deviceid,userid from device_connection  where userid = (?)) as c1  inner join socket_id on c1.deviceid = socket_id.deviceid;`;

  const [all_socketid_deviceid_userid, column3] = await db.query(
    sql,
    taggedUser
  );

  sql = `insert into tagging_people(taggedpeople,postid) values`;

  for (let tagging of taggedUser) {
    sql += `('${tagging}','${postid}'),`;
  }

  const [tagged_one] = await db.query(sql);

  for (info of all_socketid_deviceid_userid) {
    socket
      .to(info.socketid)
      .emit("tagged", { username: username, storingFileLink });
  }

  sql = `select * from (select * from(select * from (select * from  all_connection where status = success and (all_connection.connectorid = '${userid}'  or all_connection.connecteeid = '${userid}')) as c1 ,user_details where (user_details.userid = c1.connectorid or user_details.userid = c1.connecteeid ) and user_details.acc_type =personal) as c2 inner join device_connection on c2.userid = device_connection.userid) as c3 inner join users_socketid on user_socketid.deviceid = device_connection.deviceid;`;
  const [names, column2] = await db.query(sql);

  sql = `select * from user_details where userid = '${userid}'`;

  const [phototaking, column1] = await db.query(sql);

  const photoid = phototaking[0].image;

  for (naming of names) {
    socket
      .to(naming.socketid)
      .emit("sendingPost", {
        storingFileLink,
        caption,
        location,
        interesttag,
        taggedUser,
        username,
        userid,
        photoid,
      });
  }

  sql = `insert into all_commentid values('${postid}','${userid}');`;

  const [storingCommentId] = await query(sql);
};

module.exports = addPost;
