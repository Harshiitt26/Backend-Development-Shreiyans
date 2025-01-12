const express = require("express");
const router = express.Router();
const {body, validationResult}= require("express-validator")
const userModel = require("../models/user.models.js")
const bcrypt = require("bcrypt")

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


// router.get(("/"),(req,res)=>{
//     res.send("User route")
// })
// router.get(("/tests"),(req,res)=>{
//     res.send("User tests route")
// })


module.exports = router;