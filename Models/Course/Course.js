const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const CourseDetailsSchema = new Schema({
    courseNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    courseCredit: {
        type: Number,
        required: true,
    },
})

const SemesterSchema = new Schema({
    semester1: CourseDetailsSchema,
    semester2: CourseDetailsSchema
})

const CourseSchema = new Schema({
    level: {
        type: Number,
        required:true,
        unique
    },
    
    semesterCourses: SemesterSchema,
    
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
})

CourseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

CourseSchema.virtual('formattedCreatedAt').get(function () {
    return moment(this.createdAt).format('YYYY-MM-DD-HH:mm:SS');
});
CourseSchema.virtual('formattedUpadateAt').get(function () {
    return moment(this.UpdatedAt).format('YYYY-MM-DD-HH:mm:SS');
});

CourseSchema.set('toObject', { getters:true });
CourseSchema.set('toJSON', { getters:true });

const Course = mongoose.model('Course', CourseSchema)

module.exports = Course