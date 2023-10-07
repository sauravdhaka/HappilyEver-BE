const {User} = require('../models/users')
const {Session} = require('../models/session')
const uuid = require('uuid');
const jwt = require('jsonwebtoken')
const jwt_secret = 'lalala'



exports.createUser = (req,res)=>{
   const {name , password , university_ID} = req.body

   if(!name || !password || !university_ID){
    return res.status(422).json("Please add all the fields")
   }

   User.findOne({university_ID}).then((savedUser)=>{
    if(savedUser){
       return  res.status(422).json({ error: "User already exits with this universityID" });
    }

    const user = new User({
        name,
        university_ID,
        password
    })
    user.save()
    .then((user)=>{
        res.json({ message: "Registerd successfully" });
    })
    .catch((user) => res.json({ message: "Not saved" }));
    

   })

}




exports.loginUser = (req,res)=>{
    const {university_ID , password} = req.body
    if(!university_ID || !password){
        return res.status(422).json({error:"Please add university_ID and password"})
    }
    User.findOne({university_ID : university_ID}).then(
        (savedUser) => {
            if(!savedUser){
                return res.status(422).json({ error: "Invalid university_ID" });
            }

            if(savedUser.password === password){
                const uuid_token = uuid.v4();
                const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
                res.setHeader('USER_ID',savedUser._id).json({ uuid_token , token});
            }
            else{
                return res.status(422).json({ error: "Invalid password" });
            }
        }
    )
}



exports.createSession = (req,res)=>{
    
    const session = new Session({
        session_time : req.body.session_time,
        postedBy : req.user._id
    })

    session.save()
    .then((result)=>res.json(result))
    .catch((err)=>res.json(err))
    
    
}

exports.freeSession = async (req,res) => {
    const result = await Session.find( {isAvailable : true})
    //const free_session = result(item => item.isAvailable === true)
    res.json(result)
}



exports.bookASession = async (req,res)=>{
    const {time} = req.body
    const bookedSlot = await Session.findOneAndUpdate({$and : [{session_time : time} , {isAvailable : true}]},{isAvailable : false},{new:true})
   const pending_sessions = await User.findByIdAndUpdate(bookedSlot.postedBy,{$push : {
    pending_sessions : {
        session_time : time,
        BookedBy : req.user.name
    }
   }})
    res.json("Session is booked successfully !!!")
}

exports.pendingSessions = async (req,res)=>{
    const pending = await User.findOne({_id:req.user._id},{pending_sessions:1})
    
    res.json(pending)

}



