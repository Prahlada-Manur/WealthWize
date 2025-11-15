const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
    expenseDate: Date,
    title: String,
    amount: Number,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    description: String
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;