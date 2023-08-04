const express = require('express')
const router = express.Router()
const { createGrade, getGrade} = require('../../Controllers/grade')
const { validateCreateGrade } = require('../../Middlewares/validateGrade')


router.get('/', getGrade);

router.post('/', validateCreateGrade, createGrade);
module.exports = router