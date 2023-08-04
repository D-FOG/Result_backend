const mongoose = require('mongoose');
const Schema = mongoose.Schema

const studentGradeSchema = new Schema({
    matNo: {
        type: String,
    },
    gradeValue: {
        type: String
    },
    courseNumber: {
        type: Number
    },
    courseName: {
        type: String
    },
    courseCode:{
        type: String
    },
    levelNumber:{
        type: Number,
    },
    semesterNumber: {
        type: Number,
    },
    creditUnits: {
        type: Number
    }
})

const StudentGrade = mongoose.model('StudentGrade', studentGradeSchema)

module.exports = StudentGrade