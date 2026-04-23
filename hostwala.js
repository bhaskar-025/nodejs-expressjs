const express = require('express');
const path=require('path');
const hostwalarouter = express.Router();
const rootDir = require('../utils/pathutil');
const Homing = require('../models/home');

const app = express();
  app.set('view engine','ejs');
  app.set('views', path.join(rootDir, 'views'));

  app.use(express.static(path.join(rootDir,'public')));

hostwalarouter.get("/", (req, res, next) => {

      Homing.find().then(showinguser=>{
      res.render('hostwala',{showinguser: showinguser,isloggedin:req.isloggedin});
      });

});

// hostwalarouter.get("/hosting", (req, res) => {
//     res.send("<h1>Hosting Page</h1>");
// });

module.exports = hostwalarouter;