const express = require('express')
const router = express.Router()
const StudentGrade = require('../../Models/StudentGrade/studentGrade')

router.get('/', (req,res) => {
    const {matNo} = req.body
    const sGrades = StudentGrade.findOne({matNo})
        .then(sGrade => {
            res.send(sGrade)
        })
        .catch(error => {
            res.status(404).send(`Not found: ${error}`)
        })
});

router.put('/', (req,res) => {
    const body = req.body
    const {matNo, courseNumber} = req.body
    const sGrades = StudentGrade.findOneAndUpdate({matNo, courseNumber}, body)
        .then( sGrade => {
            if (!sGrade){
                res.status(404).send(`Not found in the database`)
            }
            res.status(201).send(sGrade);
        })
        .catch( error =>  {
            res.status(404).send(`Not found, error updating grades: ${error}`)
        })
});

router.delete('/', (req,res) => {
    const {matNo, courseNumber} = req.body
    StudentGrade.findOneAndDelete({matNo, courseNumber})
        .then(sGrade => {
            res.send(sGrade)
        })
        .catch(error => {
            res.send(`Error deleting grades try again later: ${error}`)
        })
});

module.exports = router