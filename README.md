# A-Tech 

## features:
- RESTful API Architecture: Efficient and scalable communication between client and server with RESTful API design.
- User Authentication & Authorization: Secure user authentication with role-based access control (RBAC) for admins, editors, and users.
- Post Management System: Full CRUD functionality for managing blog posts
- Commenting System: Integrated commenting system with moderation capabilities.
- Database Integration: MongoDB for dynamic data storage and efficient content management
- Real-time Updates: Live content updates for posts and comments in real time.
- Search & Filtering: Powerful search and filtering options for articles by keyword, category, or date.
- Performance Optimization: Optimized for fast loading and high performance using caching and efficient queries.
- Error Handling & Logging: Comprehensive error handling and logging for platform reliability.
- Scalability & Security: Designed with JWT-based security and scalable architecture for cloud deployment.

## technology used  
- Express
- Mongodb
- Jwt
- Mongoose
- typescript
- zod


## Admin
 
 email: f@gmail.com
 password: 1234

## Live Link : https://a-motors-backend.vercel.app/
 
## Installation 

- If you want to run this code into your local  then follow the instruction.

* clone github repo 

```
https://github.com/ashraf56/A-tech-backend.git
```


*  opne your vs code terminal and write npm i

``` 
npm i
```


* create an env file  and set env variable  

```
Database_url= set here your mongodb database url
PORT= set your port
Node_Env= development
PORT=5000
Defaultpass  = abc1234
saltNumber = 10 
JWT_sec_Token = your token
originUrl= your frontend url
admin_Password = 1234
```

* Run tsc -w in the terminal
```
tsc -w
```

* Run server on local  
```
npm start
```
