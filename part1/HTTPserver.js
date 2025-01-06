// creating a server using http , (without using express)
const http = require("http") // http is pre-installed in the node_modules folder
const server = http.createServer((req,res)=>{
    // console.log(req.url); // req.url the route hitted
    if(req.url == "/"){
        res.end("Hello World.")
    }
    if(req.url == "/about"){
        res.end("Welcome to About page.")
    }
    if(req.url == "/profile"){
        res.end("Welcome to profile page.")
    }
})
server.listen(5000,()=>{
    console.log("Server started")
})