const express = require('express')
const Student = require('../../Models/Student/studentModel')
const router = express.Router();

router.post('/', (req, res) => {
    res.send("hello i'm a route");
    const addStudent = async () => {
        const newStudent = new Student({
            firstName: 'Favour',
            lastName: 'Ogbonda',
            middleName: 'Onyemauchechukwu',
            MatNo: 'U2018/5570017',
            studentEmail: 'fogbonda017@uniport.edu.ng'
        });
    
        await newStudent.save()
        .then(() => {
            res.send('Student saved successfully');
        })
        .catch((error) => {
            console.log(`The was an error saving student ${error}`)
        })
    }

    addStudent()
})

module.exports = router