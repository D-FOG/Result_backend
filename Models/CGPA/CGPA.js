const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TotalGradeSchema = new Schema({
    CGPA: {
        Type: Number
    },
    MatNo: {
        type: String,
        unique: true,
    },
    createdAt: Date.now(),
    updatedAt: Date.now()
})

const TotalGrade = mongoose.model('TotaleGrade', TotalGradeSchema);

module.exports = TotalGrade