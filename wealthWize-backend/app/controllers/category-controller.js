const Category = require('../models/category-model');
const categoryValidationSchema = require('../validation/category-validation');
const categoryCltr = {};

categoryCltr.create = async (req, res) => {
    const body = req.body;
    const { error, value } = categoryValidationSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details });
    }
    try {
        const categoryInDb = await Category.findOne({ name: value.name, user: req.userId });
        if (categoryInDb) {
            return res.status(400).json({ error: 'category already exits' })
        }
        const category = new Category(value);
        category.user = req.userId;
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'something went wrong' })
    }
}
categoryCltr.list = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.userId }).populate('user', ['_id', 'username']);
        console.log(categories)
        res.json(categories)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
categoryCltr.remove = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOneAndDelete({ _id: id, user: req.userId });
        if (!category) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json(category)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong" })
    }
}
categoryCltr.update = async (req, res) => {
    const id = req.params.id;
    const body = req.body
    const { error, value } = categoryValidationSchema.validate(body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ error: error.details })
    } try {
        const category = await Category.findOneAndUpdate({ _id: id, user: req.userId }, value, { new: true })
        if (!category) {
            return res.status(404).json({ error: 'Record not found' })
        }
       res.status(200).json(category)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
categoryCltr.show = async (req, res) => {
    const id = req.params.id;
    try {
        const category = await Category.findOne({ _id: id, user: req.userId }).populate('user', ['_id', 'username'])
        if (!category) {
            return res.status(404).json({ error: 'record not found' })
        }
        res.json(category);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "something went wrong" })
    }
}

module.exports = categoryCltr;