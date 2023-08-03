const joi = require('joi');

const capitalizeFirstLetter = (value) => {
    // Ensure the value is a string
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
  
    // Convert the whole string to lowercase and then capitalize the first letter
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const toLowerCase = (value) => {
    if (typeof value !== 'string') {
      throw new Error('Invalid input. The value must be a string.');
    }
    return value.toLowerCase();
  };

const createAdminSchema = joi.object({
    firstName:joi.string().label('First name').custom(capitalizeFirstLetter).required(),
    lastName:joi.string().label('Last name').custom(capitalizeFirstLetter).required(),
    middleName:joi.string().label('Middle name').custom(capitalizeFirstLetter).required(),
    password:joi.string().min(6).max(8).label('password'),
    passwordConfirm:joi.string().ref(password),
    email:joi.string().email().label('Email').custom(toLowerCase).required()
})

const updateAdminSchema = joi.object({
    firstName:joi.string().label('First name').custom(capitalizeFirstLetter),
    lastName:joi.string().label('Last name').custom(capitalizeFirstLetter),
    middleName:joi.string().label('Middle name').custom(capitalizeFirstLetter),
    password:joi.string().min(6).max(8).label('password'),
    passwordConfirm:joi.string().ref(password),
    email:joi.string().email().label('Email').custom(toLowerCase)
})

const validateCreateAdmin = (req, res, next) => {
    const {error, value} = createAdminSchema.validate(req.body)
    if (error) {
        res.status(400).send(error);
    } else {
        req.val = value
    }
    next()
}

const validateUpdateAdmin = (req, res, next) => {
    const {error, value} = updateAdminSchema.validate(req.body)
    if (error) {
        res.status(400).send(error);
    } else {
        req.val = value
    }
    next()
}
module.exports = {
    validateCreateAdmin,
    validateUpdateAdmin
}