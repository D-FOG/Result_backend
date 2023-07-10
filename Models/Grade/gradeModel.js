const mongoose = require('mongoose');

const Schema = new mongoose.Schema;


const GradeSchema = new Schema({
    courseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    gradeValue: {
        type: String,
        required: true,
    },
    academicYear: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
})

GradeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

GradeSchema.virtual('formattedCreatedAt').get(function () {
    return moment(this.createdAt).format('YYYY-MM-DD-HH:mm:SS');
});
GradeSchema.virtual('formattedUpadateAt').get(function () {
    return moment(this.UpdatedAt).format('YYYY-MM-DD-HH:mm:SS');
});

GradeSchema.set('toObject', { getters:true });
GradeSchema.set('toJSON', { getters:true });

const Grade = mongoose.model('Grade', GradeSchema)

module.exports = Grade