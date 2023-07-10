const express = require('express');
const db = require('./db')
require('dotenv').config();
const route = require('./Routes/studentsRoutes/student')
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("hello ma world");
})

app.use('/routes', route)

db();

console.log(process.env.PORT);

//Routes Importing

port = process.env.PORT;

Port = port || 3000;

app.listen(Port, () => {
    console.log("I am listening on port " + Port)
})



