const express = require('express');
const router = express.Router()
const {Level, Course, Semester} = require('../../Models/Course/Course')
const Grade = require('../../Models/Grade/gradeModel')


router.get('/', (req,res) => {
    try{
        const {levelNumber} = req.body
        Level.find({levelNumber})
            .then(course => {
                // const array = course.semester[0].courses
                // const courseArray = array[0].creditUnits
               // console.log(courseArray)
               res.send(course)
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).send(`Internal error: ${error}`);
    }
});


router.post('/', (req,res) => {
    try{
        const {name, code, creditUnits, subjectNumber, semesterNumber} = req.body
        const {levelNumber} = req.body;
        const courseDoc = new Course({name, code, creditUnits, subjectNumber})
            
        const semesterDoc = new Semester({
            semesterNumber,
            courses: courseDoc
         });
 
         const course = new Level({
             levelNumber, 
            semester: semesterDoc
         })
         course.save()
             .then(courses => {
                 res.status(200).send(courses);
             })
             .catch(err => {
                 res.status(500).send("Not able to create course database")
             })   
            
    } catch(error){
        res.status(500).send(`Error: ${error}`)
    }
});

router.put('/', (req, res) => {
    const { levelNumber, name, code, creditUnits, semesterNumber, subjectNumber} = req.body;
    const body = req.body;
    try{
        Level.findOneAndUpdate(
            {
              levelNumber,
              "semester.courses.subjectNumber": subjectNumber
            },
            {
              $set: { "semester.$[sem].courses.$[course].creditUnits": creditUnits, "semester.$[sem].courses.$[course].name": name, "semester.$[sem].courses.$[course].code": code }
            },
            {
              arrayFilters: [
                { "sem.courses.subjectNumber": subjectNumber },
                { "course.subjectNumber": subjectNumber }
              ],
              new: true
            }
          )
            .then(courses => {
                res.status(200).send(courses);
            })
            .catch(err => {
                res.status(400).send(`Failed to upload courses: ${err}`);
            })
    } catch (err) {
        res.status(500).send(`Server error: ${err}`);
    }
});

router.delete('/', (req, res) => {
    const { levelNumber } = req.body;


    try {
        Level.findOneAndDelete({ levelNumber })
            .then(course => {
                res.status(200).send(course);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).send(`Internal error: ${error}`);
    }
});
module.exports = router
