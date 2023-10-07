const express = require('express')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')


const app = express()
app.use(express.json())

app.use('/user',userRoute.router)

app.get('/',(req,res)=>{
    res.json('hello from server')
})


mongoose.connect('mongodb+srv://sauravdhaka456:DtEDjvXT18iV4rj4@cluster0.f4mxyco.mongodb.net/')

mongoose.connection.on("connected",()=>{
    console.log("connected");
})
mongoose.connection.on("error",()=>{
    console.log("not connected");
})






app.listen(5000,()=>{
    console.log('server is running')
})