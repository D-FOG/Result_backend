const joi = require('joi');

  const toUpperCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toUpperCase();
  };

const createGradeSchema = joi.object({
    gradeValue: joi.string().max(1).label('Grade').custom(toUpperCase).required(),
    courseNumber: joi.number().label('Course Number').required(),
    academicYear: joi.number().label('Academic year'),
    subjectNumber: joi.number().label('Course Number'),
    matNo: joi.string().max(13).label('Matriculation number').required()
})

const validateCreateGrade = (req, res, next) => {
    const {error, value} = createGradeSchema.validate(req.body)
    if (error) {
        res.status(400).send(error);
    } else {
        req.val = value
    }
    next()
}

module.exports = {
    validateCreateGrade,
}