const express = require("express")
const app = express()
require("dotenv").config()
app.set("view engine","ejs") //ejs is a view engine used to render a html file using express

// Middlewares are of 3 types - Built-in, custom, 3rd-party
// Custom MiddleWare
app.use((req,res,next)=>{
    console.log("This is a common middleware for each route")
    let arr = ["apple","mango","tomato"]
    console.log(arr[2])
    next()
})
// 3rd-party Middleware morgan
const morgan = require("morgan")
const { default: DB_connection } = require("./database/db")
app.use(morgan("dev"))

app.get(("/"),(req,res)=>{
    res.send("Hello World...")
})
app.get(("/author"),(req,res)=>{
    res.render("index")
})
app.get(("/form"),(req,res)=>{
    res.render("form")
})
// GET method is used for sending data from server to frontend
// POST method is used for sending data from frontend to server
// in-built middlewares for rendering html file
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public")) // used for showing css file in public folder for frontend

app.post(("/get-form-data"),(req,res)=>{
    console.log(req.body)
    res.send("Thank you for filling the form")
})
const mongoose = require("mongoose")
const userModel = require("./models/user.js")
const connectDB = require("./database/db.js");
connectDB()

app.get("/register",(req,res)=>{
    res.render("register")
})
app.post(("/register"), async (req,res)=>{
    console.log(req.body)
    const {username,email,password}= req.body;

    const newUser = await userModel.create({
        username: username,
        email: email,
        password: password,
    })

    res.send(newUser)
})

app.listen(process.env.PORT)