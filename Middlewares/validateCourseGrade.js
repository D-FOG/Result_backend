const joi = require('joi');

const capitalizeFirstLetter = (value) => {
    // Ensure the value is a string
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
  
    // Convert the whole string to lowercase and then capitalize the first letter
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const toUpperCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toUpperCase();
  };

const createCourseGradeSchema = joi.object({
    name: joi.string().label('Course name').custom(capitalizeFirstLetter).required(),
    code: joi.string().label('Course abbreviation').custom(toUpperCase).required(),
    creditUnits: joi.number().label('Credit Units').required(),
    subjectNumber: joi.number().label('Course Number').required(),
    semesterNumber: joi.number().label('Semester Number').required(),
    levelNumber: joi.number().label('Level Number').required()
})

const updateCourseGradeSchema = joi.object({
    name: joi.string().label('Course name').custom(capitalizeFirstLetter),
    code: joi.string().label('Course abbreviation').custom(toUpperCase),
    creditUnits: joi.number().label('Credit Units'),
    subjectNumber: joi.number().label('Course Number'),
    semesterNumber: joi.number().label('Semester Number'),
    levelNumber: joi.number().label('Level Number')
})

const validateCreateCourse = (req, res, next) => {
    const {error, value} = createCourseGradeSchema.validate(req.body)
    if (error) {
        res.status(400).send(error);
    } else {
        req.val = value
    }
    next()
}

const validateUpdateCourse = (req, res, next) => {
    const {error, value} = updateCourseGradeSchema.validate(req.body)
    if (error) {
        res.status(400).send(error);
    } else {
        req.val = value
    }
    next()
}
module.exports = {
    validateCreateCourse,
    validateUpdateCourse
}