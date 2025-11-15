const joi=require('joi');
const categoryValidationSchema=joi.object({
    name:joi.string().trim().required()
})

module.exports=categoryValidationSchema;