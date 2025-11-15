const joi=require("joi");
const expenseValidationSchema=joi.object({
    expenseDate:joi.date().required().less(new Date()),
    title:joi.string().required().trim(),
    amount:joi.number().required().min(5),
    category:joi.string().required(),
    description:joi.string()
});
module.exports=expenseValidationSchema;