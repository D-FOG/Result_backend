const express = require('express')
const Student = require('../../Models/Student/studentModel')
const database = require('../../database.json')
const router = express.Router();

router.post('/', async (req, res) => {
    const studentBody = req.body;
    const {matNo, studentEmail} = req.body;
    try{
        const student = await Student.findOne({$or: [{ matNo },{ studentEmail }]})
            .then(isStudents => {
                if (isStudents) {
                    const isStudentFields = []
                    if (isStudents.matNo === matNo){
                        isStudentFields.push('Matriculation number')
                    }
                    if (isStudents.studentEmail === studentEmail){
                        isStudentFields.push('Student email')
                    }
                    res.status(409).json({error:`${ isStudentFields } already exists`})
                } else {
                    const students = new Student(studentBody)
                    students.save()
                        .then(students => {
                            res.status(200).send(students);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload students: ${err}`);
                        })
                }
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
});

router.get('/', (req, res) => {
    try{
        Student.find({})
            .then(students => {
                res.status(200).send(students);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
});

router.put('/', (req, res) => {
    const { firstName, lastName, middleName, studentBody } = req.body;
    const {matNo, studentEmail} = req.body;
    try{
        const student = Student.findOne({$or: [{ matNo }]})
            .then(isStudents => {
                if (isStudents) {
                    const isStudentFields = []
                    if (isStudents.matNo === matNo){
                        isStudentFields.push('Matriculation number')
                    }
                    // if (isStudents.studentEmail === studentEmail){
                    //     isStudentFields.push('Student email')
                    // }
                    res.status(409).json({error:`${ isStudentFields } already exists`})
                } else {
                    Student.findOneAndUpdate({studentEmail}, { firstName, lastName, middleName, matNo },{new: true})
                        .then(students => {
                            res.status(200).send(students);
                        })
                        .catch(err => {
                            res.status(400).send(`Failed to upload students: ${err}`);
                        })
                }
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
});

router.delete('/', (req, res) => {
    const { matNo } = req.body;


    try {
        Student.findOneAndDelete({ matNo })
            .then(students => {
                res.status(200).send(students);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
});
module.exports = router