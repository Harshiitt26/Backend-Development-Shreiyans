const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3,"Username must be atleast 3 characters long"]
    },
    email:{
        type:String, 
        required: true,
        trim: true,
        lowercase: true,
        minlength: [13,"Email must be atleast 13 characters long"]
    },
    password:{
        type: String,
        required: true,
        minlength: [6,"Password must be atleast 6 characters long"]
    },
    phoneNumber:{
        type:String,
        required: true,
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)
module.exports = User