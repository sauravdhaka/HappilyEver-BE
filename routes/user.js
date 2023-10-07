const express = require('express');
const router = express.Router();
const { createUser, loginUser, createSession , freeSession, bookASession, pendingSessions } = require('../controllers/user');
const requireLogedIn = require('../middelwares/requireLogedIn');

router.post('/create-user',createUser)
       .post('/login',loginUser)
       .post('/create-session',requireLogedIn,createSession)
       .get('/free-session',requireLogedIn,freeSession)
       .patch('/book-session',requireLogedIn,bookASession)
       .get('/pending-session',requireLogedIn,pendingSessions)
      
exports.router = router;