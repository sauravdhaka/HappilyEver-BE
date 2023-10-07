const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema


const sessionSchema = new Schema({
    session_time : {type : String , required : true},
    isAvailable : { type : Boolean , default : true},
    postedBy : {type : ObjectId ,ref : "USER"} 
})


exports.Session = mongoose.model("SESSION",sessionSchema)