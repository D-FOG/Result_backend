const mongoose = require('mongoose');
//const { Level } = require('../Course/Course')

const Schema = mongoose.Schema;


const GradeSchema = new Schema({
    matNo: {
        type: String,
        unique: true
    },
    courseNumber: {
        type: Number,
        unique: true,
    },
    gradeValue: {
        type: String,
    },
    matno:{
        type: String,
        unique: true
    },
    academicYear: {
        type: Number,
    },
    updatedAt: {
        type: Date,
    },
})

const Grade = mongoose.model('Grade', GradeSchema)

module.exports = Grade