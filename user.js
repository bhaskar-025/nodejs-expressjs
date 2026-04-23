const express = require('express');
const userrouter = express.Router();
const Home = require('../models/home');

// /user route (from routapp) will render userwala.ejs
userrouter.get('/', (req, res, next) => {

  Home.find().then(showinguser=>{
    res.render('userwala',{showinguser: showinguser,isloggedin:req.isloggedin});
  });

});

 userrouter.get('/:userid', (req, res, next) => {
  const userid = req.params.userid;
  console.log(userid);

  Home.findById(userid).then(userdata=>{
    if (!userdata) {
      return res.status(404).send('User not found');
    }
    const userfound = userdata;
    res.render('userdetails',{userfound: [userfound],isloggedin:req.isloggedin});
  })


 });

module.exports = userrouter;