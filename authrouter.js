const path = require('path');
const express = require('express');
const authrouter = express.Router();
const Homing = require('../models/home');

const rootDir = require('../utils/pathutil');
const formcontroller = require('../controllers/authcontroller');


// Setup multer for file uploads

authrouter.use(express.urlencoded({ extended: false }));
authrouter.get("/", formcontroller.getlogin);
authrouter.post("/", formcontroller.postlogin);
authrouter.post("/logout", formcontroller.postlogout);
authrouter.get("/signup", formcontroller.getsignup);
authrouter.post("/signup", formcontroller.postsignup);
exports.authrouter = authrouter;

