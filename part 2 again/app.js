const express = require("express")
require('dotenv').config()
const userRouter = require("./routes/user.routes")
const connectDB = require("./config/db.js")
connectDB()
const cookieParser = require("cookie-parser")


const app = express()
app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use("/user",userRouter);

// app.get(("/"),(req,res)=>{
//     res.render("register")
// })
app.listen((process.env.PORT),()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})