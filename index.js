const express = require('express');
const db = require('./db')
require('dotenv').config();
const studentRoute = require('./Routes/studentsRoutes/student')
const adminRoute = require('./Routes/adminRoutes/admin') 
const courseRoute = require('./Routes/coursesRoutes/course')
const resultRoute = require('./Routes/resultRoutes/grade')
//const 
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("hello ma world");
})

app.use('/students', studentRoute)
app.use('/admin', adminRoute)
app.use('/course', courseRoute)
app.use('/results', resultRoute)

db();

console.log(process.env.PORT);

//Routes Importing

port = process.env.PORT;

Port = port || 3000;

app.listen(Port, () => {
    console.log("I am listening on port " + Port)
})



