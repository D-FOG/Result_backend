const express = require('express');
const db = require('./db')
require('dotenv').config();
const studentRoute = require('./Routes/studentsRoutes/student')
const adminRoute = require('./Routes/adminRoutes/admin') 
const courseRoute = require('./Routes/coursesRoutes/course')
const resultRoute = require('./Routes/resultRoutes/grade')
const studentGradeRoute = require('./Routes/studentGradeRoute/studentGradeRoute')
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
app.use('/Grade', studentGradeRoute)





// async function hash(){
//     let array = []
//         const password = `favour`
//         const hashedPassword = await bcrypt.hash(password, 10)
//         return hashedPassword
    
    
//     // array.push(hashedPassword)
//     // console.log(hashedPassword)
//     // console.log(typeof hashedPassword)

//     // bcrypt.compare(hashedPassword, password, (err, isPassword) => {
//     //     if (err){
//     //         console.log(`password incorrect fatal error: ${err}`)
//     //     } else if (isPassword){
//     //         console.log('passwords are matching')
//     //     } else {
//     //         console.log(`access denied`)
//     //     }
//     // })
// }


// try {
//     const data = hash()
//     return data
// } catch (err) {
//     console.log(err)
// }
// // const vall = hash()

// console.log(data)

// async function unHash(){
//     const matchPassword = bcrypt.compare(hashedPassword, password)
//     console.log(matchPassword)
// }

// unHash()


db();

console.log(process.env.PORT);

//Routes Importing

port = process.env.PORT;

Port = port || 3000;

app.listen(Port, () => {
    console.log("I am listening on port " + Port)
})



