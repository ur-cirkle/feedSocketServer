use ur_cirkle;
CREATE TABLE all_users(
	userid VARCHAR(11) PRIMARY KEY UNIQUE,
	username VARCHAR(100) UNIQUE,
	password VARCHAR(100),
	email VARCHAR(100) UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE user_details(
	userid VARCHAR(11),
	image VARCHAR(255),
	bio	VARCHAR(255) DEFAULT "",
	DOB DATE,
	acc_type ENUM('personal','community'),
	gender ENUM('male','female','other','not decided') DEFAULT 'not decided',
	public BOOLEAN,
	FOREIGN KEY(userid) REFERENCES all_users(userid) ON DELETE CASCADE
);

create table add_post(userid VARCHAR(11),	FOREIGN KEY(userid) REFERENCES all_users(userid) ON DELETE CASCADE,
postid varchar(11) primary key,
caption varchar(100),
location varchar(250)
);

create table add_blog(
userid VARCHAR(11),	FOREIGN KEY(userid) REFERENCES all_users(userid) ON DELETE CASCADE,
blogid varchar(11)  primary key,
blog text(50000),
header varchar(100)
);



create table interest_tags(tags varchar(40),id varchar(11));

create table posturl( url varchar(200), imagtype enum("compressed","original"),postid varchar(11) ,foreign key(postid) references add_post(postid));

create table device_connection(deviceid varchar(50) primary key,userid VARCHAR(11),	FOREIGN KEY(userid) REFERENCES all_users(userid) ON DELETE CASCADE);

drop table device_connection;

create table socket_id(deviceid varchar(50),foreign key(deviceid) references device_connection(deviceid),socketid varchar(20));