const express = require('express')
const router = express.Router()
const { getStudentGrade, updateStudentGrade, deleteStudentGrade} = require('../../Controllers/studentGradeControllers')

router.get('/', getStudentGrade);

router.put('/', updateStudentGrade);

router.delete('/', deleteStudentGrade);

module.exports = router