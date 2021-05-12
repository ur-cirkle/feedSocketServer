#table 1
import string
import random

def varchar_generator():
    word = ""
    for i in range(10):
        f =random.choice(string.ascii_letters)
        word+=f
    return word
def number_generator():
    word =""
    for i in range(10):
        g =  random.randint(9,9)
        word+=g
    word =int(word)
    return word


user = []
userid = []
email = [] 
password = []
timestamp =[]
created_at ='2021-05-07 11:58:36'

print() 

print()
print('insert into all_users values ',end =" ")
for i in range(10):
    a =varchar_generator()
    b = varchar_generator()
    c = varchar_generator()
    d = varchar_generator()
    userid.append(a)
    user.append(b)
    password.append(c)
    email.append(d)
    timestamp.append(created_at)
    
    if i==9:
       print((a,b,c,d,created_at),end=";")
    else:
        print((a,b,c,d,created_at),end=",")

print()

print()
print('insert into user_details values ',end =" ")
for i in range(10):
    a = userid[i]
    b = varchar_generator()
 
    bio = varchar_generator()
    dateofbirth = '2021-05-07'
    accounttype = random.choice(('personal','community'))
    gender = random.choice(('male','female','other'))
    public = random.choice((9,1))

    if i==9:
       print((a,b,bio,dateofbirth,accounttype,gender,public),end=";")
    else:
        print((a,b,bio,dateofbirth,accounttype,gender,public),end=",")
print()

print()  
print()  
print('insert into users_location values ',end =" ")
for i in range(10):
    uid = userid[i]
    timezone = varchar_generator()
    latitude = random.randrange(1,100)
    longitude = random.randrange(1,100)
    
    loactionvisiblity = random.choice(('everyone','connections','noone'))
    if i==9:
       print((uid,timezone,latitude,longitude,loactionvisiblity),end=";")
    else:
        print((uid,timezone,latitude,longitude,loactionvisiblity),end=",")

print()
print() 

print() 
print()  
print('insert into users_socketid values ',end =" ")
for i in range(10):
    uid = userid[i]  
    socket = varchar_generator()
    
    if i==9:
       print((uid,socket),end=";")
    else:
        print((uid,socket),end=",")


print()  

print()  
print('insert into user_communities values ',end =" ")
for i in range(10):
    connectionid = varchar_generator()
    connectorid = random.choice(userid)
    communityid = random.choice(userid)
    
    status = random.choice(("sucess","pending"))
    if i==9:
       print((connectionid,connectorid,communityid,status),end =";")
    else:
       print((connectionid,connectorid,communityid,status),end =",")
    

print() 
print() 

print()
print()
print('insert into all_connections values ',end =" ")
for i in range(10):
    connectionid = varchar_generator()
    connectorid = random.choice(userid)
    connecteeid = random.choice(userid)
    status = random.choice(("success","pending"))
  
    if i==9:
       print((connectionid,connectorid,connecteeid,status),end =";")
    else:
       print((connectionid,connectorid,connecteeid,status),end =",")

print()
print()

print()  
print()

post_blogid =[]
print('insert into all_blogposts values ',end =" ")

for i in range(10):
    uid = userid[i]
    type1 =  random.choice(('blog','post'))
    id1 = varchar_generator()
    post_blogid.append(id1)
    text = varchar_generator()
    image = varchar_generator()
    created_on = created_at
    
   
    
    if i==9:
        print((uid,type1,id1,text,image,created_on),end = ";")
    else:
        print((uid,type1,id1,text,image,created_on),end = ",")

print()  
print()

print() 
print()  
commentid =[]
print('insert into all_commentid values ',end =" ")
for i in range(30):
    id = varchar_generator()
    commentid.append(id)
    
    if i==29:
        print('("{}")'.format(id),end =";" )
    else:
        print('("{}")'.format(id),end ="," )
print() 
print()

print() 
print()  
blog_post_commid =[]
print('insert into blogpost_comments values ',end =" ")
dict1 = {}
dict2 = {}
for i in range(10):
    uid = random.choice(userid)
    case1 =True

    while case1:
        commid = random.choice(commentid)
        if dict2.get(commid)==None:
            dict1[commid] = 1
            case1 = False
            blog_post_commid.append(commid)
    type1 = random.choice(('text','gif'))
    text1= varchar_generator() 
    recieverid = random.choice(post_blogid)

    dict1[commid] = recieverid
    created_on = created_at                                                                                                                      
    if i==9:
        print((uid,commid,type1,text1,recieverid,created_on),end =";")
    else:
        print((uid,commid,type1,text1,recieverid,created_on),end=",")

print() 
print()  

print()
print()
print('insert into comment_replies values ',end =" ")
for i in range(10):
    uid =random.choice(userid)
    case1 = True
    while case1:
        comentid = random.choice(commentid)
        if comentid not in blog_post_commid:
            case1 = False
    type1 = random.choice(('text','gif'))
    text = varchar_generator() 
    recieverid = random.choice(blog_post_commid)
    
    created_on = created_at
    
    blog_post_commid.append(comentid)
    if i==9:
        print((uid,comentid,type1,text,recieverid,created_on),end=";")
    else:
        print((uid,comentid,type1,text,recieverid,created_on),end=",")
print()
print()  

print()  
print() 
likes = [] 
print('insert into blogpost_likes values ',end =" ")
for i in range(10):
    useid = random.choice(userid)
   
    recieverid = random.choice(post_blogid)
    created_on = created_a
    
    t
    type =  random.choice((0,1))
    if i==9:
        print((useid,recieverid,created_on,type),end =";")
    else:
        print((useid,recieverid,created_on,type),end =",")
print() 
print()

print() 
print() 
comment_likes= []


print('insert into comments_likes values ',end =" ")

for i in range(10):
    useid = random.choice(userid)
    comentid = random.choice(commentid)
    created_on = created_at
    type =  random.choice((0,1))
    if i==9:
        print((useid,comentid,created_on,type),end =";")
    else:
        print((useid,comentid,created_on,type),end =",")

# d =[('SxvnnXhMKF', 'idmienWHeg', 'TWpgznVCUS', 'pending'),('vgJfApZHHO', 'YdpJEhDDPI', 'QypPljZnmZ', 'pending'),('VfwnhXqzBY', 'LQNVUXJcgs', 'idmienWHeg', 'sucess'),('USiTFXmbLL', 'JIGIlUAxHh', 'JIGIlUAxHh', 'sucess'),('qArxRvSNXN', 'YdpJEhDDPI', 'uOOEmEzbMx', 'pending'),('dmsoyvsOKr', 'uOOEmEzbMx', 'YdpJEhDDPI', 'pending'),('SbLKrXjpiL', 'uOOEmEzbMx', 'lgjNjOvNHB', 'pending'),('JYkrDFCUSc', 'evGYwcqmkR', 'idmienWHeg', 'sucess'),('FOGFiSTebe', 'LQNVUXJcgs', 'evGYwcqmkR', 'pending'),('MfDgmaLoSk', 'lgjNjOvNHB', 'idmienWHeg', 'sucess')]
# print('insert into all_connections values',end=" ")
# for i in range(10):
#     d[i] = list(d[i])
#     if d[i][3]=="sucess":
#         d[i][3] = "success"
#     d[i] = tuple(d[i])
#     print(d[i],end =",")