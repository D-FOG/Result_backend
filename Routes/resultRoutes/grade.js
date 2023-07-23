const express = require('express')
const router = express.Router()
const Grade = require('../../Models/Grade/gradeModel')
const {Level} = require('../../Models/Course/Course')

router.get('/', (req,res) => {
    const {courseNumber} = req.body
    Grade.findOne({courseNumber})
        .then(grades => {
            res.status(201).send(grades)
            console.log(grades._id)
        })
        .catch(error => {
            res.status(404).send(`Grades not found ${error}`)
        })
});

router.post('/', (req,res) => {
    const {coureseNumber, gradeValue, academicYear} = req.body;
    const gradeData = req.body
    const {levelNumber} = req.body
    const grades = new Grade(gradeData)
    grades.save()
        .then(grade => {
            res.status(201).send(grade)
        })
        .catch(error => {
            res.status(500).send(`Unable to create grades ${error}`)
        })
});
module.exports = router