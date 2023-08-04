const express = require('express')
const bcrypt = require('bcrypt')
const Student = require('../../Models/Student/studentModel')
const router = express.Router();
const sendEmail = require('../../Middlewares/validateEmail')
const {validateStudent, validateStudentUpdate} = require('../../Middlewares/validateStudentModel')
const { createStudent, getStudent, updateStudent, deleteStudent } = require('../../Controllers/student') 
//const bcrypt = require('bcrypt')


router.post('/', validateStudent, sendEmail, createStudent );

router.get('/', getStudent);

router.put('/', validateStudentUpdate, updateStudent);

router.delete('/', deleteStudent);
module.exports = router
