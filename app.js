const express = require("express")
const app = express()

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
app.use(morgan("dev"))

app.get(("/"),(req,res)=>{
    res.send("Hello World...")
})
app.get(("/author"),(req,res)=>{
    res.render("index")
})

app.listen(3000)