# Result_Checker_Backend
HEAD
Please switch to master to view all files
This is the backend for the Result Checker app.
It contains the following files, which are:
* The data base connection file.
* The Models folder which holds the database schemas.
* The routes Which handle all crud methods for each model.
* Also It contains the authentication and authorization file (this feature is being worked on currently.)
 Note the Readme is subject to change based on important updates.
## Things not yet added or currrently being worked on
- Authentication and authorization.
- Proper error handling for each Models and routes.

## How to run
The project is being built using Node.js, Express.js and MongoDb. It is currently running on localhost but the database is live, running on MongoDb atlas servers.
To run it You will need to clone the repo from the Master branch and use `npm install` to install all dependencies.
After that you have to run the project on your local machine using `http://localhost:4000` 
But to test the routes you need to make use of Postman.
The routes are;
* `http://localhost:4000/students`
* `http://localhost:4000/admin`
* `http://localhost:4000/results`
* `http://localhost:4000/course`
* `http://localhost:4000/studentGrades`
  
Check `index.js` for the routes used incase the above stated dosen't work.
 Remember the Readme is subject to change due to the project is still in development.

Written with love ✌ by D_FOG. (I write with passion though by favour😁)
master
