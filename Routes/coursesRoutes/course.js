const express = require('express');
const router = express.Router()
const {Level, Course, Semester} = require('../../Models/Course/Course')
const Grade = require('../../Models/Grade/gradeModel')
const { createCourseGrade, getCourseGrade, updateCourseGrade, deleteCourseGrade} = require('../../Controllers/courseGradeControllers')
const { validateCreateCourse, validateUpdateCourse } = require('../../Middlewares/validateCourseGrade') 

router.get('/', getCourseGrade);


router.post('/', validateCreateCourse, createCourseGrade);

router.put('/', validateUpdateCourse, updateCourseGrade);

router.delete('/', deleteCourseGrade);
module.exports = router
