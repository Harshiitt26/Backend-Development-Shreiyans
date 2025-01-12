const express = require("express");
const router = express.Router();
const {body, validationResult}= require("express-validator")
const userModel = require("../models/user.models.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")



router.get(("/register"),(req,res)=>{
    res.render("register")
})

router.post(("/register"),
 body("username").trim().isLength({min:3}),
 body("email").trim().isLength({min:13}),
 body("password").trim().isLength({min:3}),
 body("phoneNumber"),
async(req,res)=>{
    // console.log(req.body)
    // res.send("User registered")
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array(),
            message: "Invalid Data"
        })
    }
    const {username,email,password,phoneNumber}= req.body
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = await userModel.create({
        username,email,password: hashPassword,phoneNumber
    })
    res.json(newUser) 
    
})


router.get(("/login"),(req,res)=>{
    res.render("login")
})
router.post(("/login"),
body("username").trim().isLength({min:3}),
body("password").trim().isLength({min:3}),
async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array(),
            message: "Inavlid data"
        })
    }
    const {username, password}= req.body;
    const user = await userModel.findOne({
        username: username
    })
    if(!user){
        return res.status(400).json({
            message: "Username doesnot exists"
        })
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        return res.status(400).json({
            message: "Username or Password is Incorrect"
        })
    }
    const token = jwt.sign({
        userId : user._id,
        email: user.email,
        username: user.username
    },process.env.JWT_SECRET)
    // res.json({token})
    res.cookie("token",token)
    res.send("Logged in")
})
// router.get(("/tests"),(req,res)=>{
//     res.send("User tests route")
// })


module.exports = router;