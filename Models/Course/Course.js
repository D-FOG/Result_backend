const mongoose = require('mongoose');
const Grade = require('../Grade/gradeModel');

const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    subjectNumber: { 
        type: Number,
        unique: true
    },
    name: String,
    code: String,
    creditUnits: Number,
    grade: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    }],
    updateAt:{
        type :Date,
        default: Date.now()
    }
});

const Course = mongoose.model('Course', subjectSchema)


const semesterSchema = new Schema({
    semesterNumber: {
        type: Number,
        unique: true
    },
    courses: [subjectSchema],
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});
const Semester = mongoose.model('Semester', semesterSchema)

const levelSchema = new Schema({
    levelNumber:{
        type: Number,
        unique: true
    },
    semester: [semesterSchema],
    // secondSemester: secondSemesterSchema,
    updatedAt: {
        type: Date,
        default: Date.now()
    }
})


const Level = mongoose.model('Level', levelSchema) 

module.exports = {
    Level,
    Course,
    Semester
}