const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    loginCount:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        default:'user'
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
