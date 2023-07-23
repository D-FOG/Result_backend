const express = require('express');
const router = express.Router()
const {Level, Course, Semester} = require('../../Models/Course/Course')
const Grade = require('../../Models/Grade/gradeModel')

// function findData(data, value){
//     let query = {}

//     switch(data){
//         case 'levelNumber':
//             query = {levelNumber: value};
//             break;
    
//         case 'semesterNumber':
//             query = {semesterNumber: value};
//             break;
    
//         case 'subjectNumber':
//             query = {subjectNumber: value};
//             break;
//         default:
//             return `invalid input type`
//     }
// }

router.get('/', (req,res) => {
    try{
        Level.findOne({levelNumber})
            .populate('semester.courses.grade', '-_id')
            .exec()
            .then(course => {
                res.status(200).send(course);
            })
            .catch(err => {
                res.status(400).send(`Not found: ${err}`);
            })
    } catch (error){
        res.status(500).status(`Internal error: ${error}`);
    }
});


router.post('/', (req,res) => {
    try{
        const {name, code, creditUnits, subjectNumber, semesterNumber, courseNumber} = req.body
        const {levelNumber} = req.body;
        
        // Course.findOne({$or: [{subjectNumber, semesterNumber}]})
        // .then(isCourse => {
        //     if (isCourse) {
        //         const isCoursefieldsFields = []
        //         if (isCourse.semstNumber === levelNumber){
        //             isStudentFields.push('Y')
        //         }
        //         // if (isStudents.studentEmail === studentEmail){
        //         //     isStudentFields.push('Student email')
        //         // }
        //         res.status(409).json({error:`${ isStudentFields } already exists`})
        //     }
            
        if (courseNumber === subjectNumber){
            //const grade = Grade.findOne({courseNumber})
            const courseDoc = new Course({name, code, creditUnits, subjectNumber})
            
            const semesterDoc = new Semester({
                semesterNumber,
                courses: courseDoc
             });
             // semesterDoc.save();
     
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
        } else {
            const courseDoc = new Course({name, code, creditUnits, subjectNumber})
            const semesterDoc = new Semester({
                semesterNumber,
                courses: courseDoc
             });
             // semesterDoc.save();
     
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
        }
        // courseDoc.save()

        
            
    } catch(error){
        res.status(500).send(`Error: ${error}`)
    }
});

router.put('/', (req, res) => {
    const { levelNumber, name, code, creditUnits, semesterNumber, subjectNumber} = req.body;
    const body = req.body;
    //console.log(body)
    try{
        // const student = Level.findOne({$or: [{ levelNumber, semesterNumber, subjectNumber }]})
        //     .then(isCourse => {
        //         if (isCourse) {
        //             const isCourseFields = []
        //             if (isCourse.matNo === matNo){
        //                 isCourseFields.push('Matriculation number')
        //             }
        //             // if (isStudents.studentEmail === studentEmail){
        //             //     isStudentFields.push('Student email')
        //             // }
        //             res.status(409).json({error:`${ isStudentFields } already exists`})
        //         } else {
        //             Student.findOneAndUpdate({studentEmail}, { firstName, lastName, middleName, matNo },{new: true})
        //                 .then(students => {
        //                     res.status(200).send(students);
        //                 })
        //                 .catch(err => {
        //                     res.status(400).send(`Failed to upload students: ${err}`);
        //                 })
        //         }
        //    })
        const updateQuery = {};
        // if (body.semester.courses){
        //     if (body.semester.courses.name){
        //         updateQuery['semester.course.name'] = body.semester.courses.name;
        //     }
        // }
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
        res.status(500).status(`Internal error: ${error}`);
    }
});
module.exports = router
//semesterNumber, subjectNumber, name, code, creditUnits