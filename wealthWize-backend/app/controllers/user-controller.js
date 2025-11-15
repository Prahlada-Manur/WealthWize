const User = require('../models/user-model');
const Category = require('../models/category-model');
const Expense = require('../models/expense-model');
const { userRegisterVlaidationSchema, userLoginValidationSchema, changePassowdValidation } =
    require('../validation/user-validation')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userCltr = {};

//-------------------------register api--------------------------------------
userCltr.register = async (req, res) => {
    const body = req.body;
    const { error, value } = userRegisterVlaidationSchema.validate(body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ error: error.details })
    } const checkEmail = await User.findOne({ email: value.email })
    if (checkEmail) {
        return res.status(400).json({ error: 'Email already exists' })
    } try {
        const user = new User(value);
        const salt = await bcryptjs.genSalt();
        const hash = await bcryptjs.hash(user.password, salt);
        user.password = hash;
        const userCount = await User.countDocuments();
        if (userCount == 0) {
            user.role = 'admin'
        }
        await user.save();
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
//---------------------------user login api----------------------------------
userCltr.login = async (req, res) => {
    const body = req.body;
    const { error, value } = userLoginValidationSchema.validate(body, { abortEarly: false })
    if (error) {
        return res.status(400).json({ error: error.details })
    }
    const user = await User.findOne({ email: value.email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid user' })
    }
    const passwordMatch = await bcryptjs.compare(value.password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid email/password" })
    }
    user.loginCount = (user.loginCount) + 1;
    await user.save();
    //generate a jwt token 
    const tokenData = { userId: user._id, role: user.role };
    console.log(tokenData)
    const token = jwt.sign(tokenData, process.env["JWT-SECRET"], { expiresIn: '7d' })
    res.json({ token: token });
}
//---------------------------user login account page api----------------------
userCltr.account = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
//---------------------------user change password api--------------------------
userCltr.changePassword = async (req, res) => {
    const body = req.body;
    try {
        const { error, value } = changePassowdValidation.validate(body, { abortEarly: false })
        if (error) {
            return res.status(400).json({ error: error.details })
        }
        const { currentPassword, newPassword } = value;
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }
        const isMatch = await bcryptjs.compare(currentPassword, user.password)
        if (!isMatch) {
            return res.status(401).json({ error: "current password is incorrect" })
        }
        //--------------------------Hashin the new provided password--------------------
        const salt = await bcryptjs.genSalt();
        const newHash = await bcryptjs.hash(newPassword, salt);
        user.password = newHash;
        await user.save();
        res.status(201).json(user, { message: 'Passowrd updated done' })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
//----------display details for admin and moderator----------------------------
userCltr.display = async (req, res) => {
    try {
        const user = await User.find();
        res.status(201).json(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}
//-----------delete an user by admin and moderator------------------------------
userCltr.remove = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(id);
        await Category.deleteMany({ user: id });
        await Expense.deleteMany({ user: id });
        res.status(200).json({ message: 'Successfully Deleted', user })
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' })
    }
}

module.exports = userCltr;