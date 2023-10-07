const mongoose = require('mongoose')
const {Schema} = mongoose
const {ObjectId} = mongoose.Schema


const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    university_ID : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    pending_sessions : [{
        session_time : {type:String},
        BookedBy : {type : String}
    }]
})


exports.User = mongoose.model("USER",userSchema)