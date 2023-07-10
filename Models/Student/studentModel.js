const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    MatNo: {
        type: String,
        required: true,
        unique: true
    },
   studentEmail: {
        type: String,
        required: true
    },
   createdAt: {
        type: Date,
    },
   updatedAt: {
        type: Date,
    },
})

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;