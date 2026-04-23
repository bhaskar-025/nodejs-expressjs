const path = require('path');
const express = require('express');
const hostrouter = express.Router();
const Homing = require('../models/home');

const rootDir = require('../utils/pathutil');
const formcontroller = require('../controllers/home');


// Setup multer for file uploads

hostrouter.use(express.urlencoded({ extended: false }));

hostrouter.get("/", formcontroller.getaddhome);


hostrouter.post('/contact_us', formcontroller.postformdata);

hostrouter.get('/edit/:id', formcontroller.getedithome);
hostrouter.post('/edit', formcontroller.posteditdata);

hostrouter.post('/delete/:id', formcontroller.postdeletedata);


exports.hostrouter = hostrouter;

// module.exports = hostrouter;