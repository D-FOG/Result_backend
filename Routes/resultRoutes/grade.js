const express = require('express')
const router = express.Router()
const Grade = require('../../Models/Grade/gradeModel')
const {Level} = require('../../Models/Course/Course')
const StudentGrade = require('../../Models/StudentGrade/studentGrade')



router.get('/', (req,res) => {
    const {courseNumber, subjectNumber} = req.body
    async function value( ) {
        let subjectValue;
        let matricNum;
        let courseValue;
        let gradeVal;
        let creditUnit;
        let levelYear;
        let semesterValue;
        let courseCodes;
        let courseDesc;
        let acadYear;
        const Course = await Level.findOne({'semester.courses.subjectNumber': subjectNumber})
        .then(course => {
            res.send(course)
            const array = course.semester[0].courses
            subjectValue = array[0].subjectNumber
            courseDesc = array[0].name
            courseCodes = array[0].code
            creditUnit = array[0].creditUnits
            semesterValue = course.semester[0].semesterNumber
            levelYear = course.levelNumber
            //res.send(`value: ${isCourse}`)
        })
    
        const grade = await Grade.findOne({courseNumber})
        .then(grades => {
            courseValue = grades.courseNumber
            matricNum = grades.matNo
            gradeVal = grades.gradeValue
            acadYear - grades.academicYear
            
            //res.send(`value: ${courseValue}`)
        })
        console.log(`value1 is: ${subjectValue} $value2 is: ${courseValue}`);
        console.log(courseDesc)
        console.log(courseCodes)
        console.log(creditUnit)
        console.log(semesterValue)
        console.log(levelYear)
        console.log(matricNum)
        console.log(gradeVal)
        console.log(acadYear)
    }
    
    //courseDesc, courseCodes, creditUnit, semesterValue, levelYear,  matricNum, gradeVal, acadYear
    
    
    value()
    
   
   
    
        // if (Course) {
        //     res.send(Course)
        // }
        //console.log(Course)
    // Grade.findOne({courseNumber})
    //     .then(grades => {
    //         res.status(201).send(grades)
    //         console.log(grades._id)
    //     })
    //     .catch(error => {
    //         res.status(404).send(`Grades not found ${error}`)
    //     })
});

router.post('/', (req,res) => {
     const {courseNumber} = req.body;
     const {subjectNumber} = req.body
    function grade(){
        const gradeData = req.body
        const grades = new Grade(gradeData)
        grades.save()
            .then(grade => {
                res.status(201).send(grade)
            })
            .catch(error => {
                res.status(500).send(`Unable to create grades ${error}`)
            }) 
    }
    grade()

    async function value( ) {
        let subjectValue;
        let matricNum;
        let courseValue;
        let gradeVal;
        let creditUnit;
        let levelYear;
        let semesterValue;
        let courseCodes;
        let courseDesc;
        let acadYear;
        const Course = await Level.findOne({'semester.courses.subjectNumber': subjectNumber})
        .then(course => {
            const array = course.semester[0].courses
            subjectValue = array[0].subjectNumber
            courseDesc = array[0].name
            courseCodes = array[0].code
            creditUnit = array[0].creditUnits
            semesterValue = course.semester[0].semesterNumber
            levelYear = course.levelNumber
            //res.send(`value: ${isCourse}`)
        })
    
        const grade = await Grade.findOne({courseNumber})
        .then(grades => {
            courseValue = grades.courseNumber
            matricNum = grades.matNo
            gradeVal = grades.gradeValue
            acadYear - grades.academicYear
            
            //res.send(`value: ${courseValue}`)
        })
        console.log(`value1 is: ${subjectValue} $value2 is: ${courseValue}`);
        console.log(courseDesc)
        console.log(courseCodes)
        console.log(creditUnit)
        console.log(semesterValue)
        console.log(levelYear)
        console.log(matricNum)
        console.log(gradeVal)
        console.log(acadYear)

        if (subjectValue === courseValue){
            const stGrades = new StudentGrade({
                matNo: matricNum,
                academicYear : acadYear ,
                semesterNumber: semesterValue,
                courseCode: courseCodes,
                courseName:  courseDesc,
                creditUnits: creditUnit,
                gradeValue: gradeVal,
                levelNumber: levelYear,
                courseNumber: courseValue
            })

            stGrades.save()
                .then(stGrade => {
                    console.log(stGrades)
                })
                .catch(error => {
                    console.log(error)
                })
        } else{
            console.error('error creating database for student Grades model')
        }
    }

    value()
    
});
module.exports = router