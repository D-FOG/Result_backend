const mongoose = require('mongoose');
const Grade = require('../Grade/gradeModel')

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    middleName: {
        type: String,
    },
    matNo: {
        type: String,
        required: true,
        // index: true,
        // unique: true
    },
   studentEmail: {
        type: String,
        // unique: true
    },
   updatedAt: {
        type: Date,
        default: Date.now()
    },
})

StudentSchema.index({matNo: 1, studentEmail: 1}, {unique: true });

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;