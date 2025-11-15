const joi = require('joi');
const userRegisterVlaidationSchema = joi.object({
    username: joi.string().trim().min(3).max(64).required(),
    email: joi.string().trim().email().required().lowercase(),
    password: joi.string().trim().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
        .messages({
            'string.pattern.base': 'password must contain one capital,small,number and special character'
        })

});
const userLoginValidationSchema = joi.object({
    email: joi.string().trim().email().required().lowercase(),
    password: joi.string().trim().required()
})
const changePassowdValidation = joi.object({
    currentPassword: joi.string().trim().required(),
    newPassword: joi.string().trim().required().pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/)
        .messages({
            'string.pattern.base': "password must contain one capital,small,number and special character"
        })
})
module.exports = {
    userRegisterVlaidationSchema,
    userLoginValidationSchema,
    changePassowdValidation
};