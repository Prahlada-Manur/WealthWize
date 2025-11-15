const Expense = require('../models/expense-model');
const expenseValidationSchema = require('../validation/expense-Validation')
const expenseCltr = {};

expenseCltr.create = async (req, res) => {
    const body = req.body;
    const { error, value } = expenseValidationSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(404).json({ error: error.details })
    } try {
        const expense = new Expense(value);
        expense.user = req.userId;
        await expense.save();
        // const savedExpense = await Expense.findById(expense._id).populate('category', ['name'])
        res.json(expense)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
expenseCltr.list = async (req, res) => {
    try {
        const expense = await Expense.find({ user: req.userId })
        res.status(201).json(expense)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
expenseCltr.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body
    const { error, value } = expenseValidationSchema.validate(body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ error: error.details })
    } try {
        const expense = await Expense.findOneAndUpdate({ _id: id, user: req.userId }, value, { new: true })
        if (!expense) {
            return res.status(404).json({ error: 'Record not found' })
        }
        res.json(expense)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
expenseCltr.remove = async (req, res) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findOneAndDelete({ _id: id, user: req.userId });
        if (!expense) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.status(200).json({ message: 'Successfully Deleated' }, expense)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" })
    }
}
expenseCltr.show = async (req, res) => {
    const id = req.params.id;
    try {
        const expense = await Expense.findOne({ _id: id, user: req.userId })
        if (!expense) {
            return res.status(404).json({ error: 'record not found' })
        }
        res.json(expense)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" })
    }
}

module.exports = expenseCltr;