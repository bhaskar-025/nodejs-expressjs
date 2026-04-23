const path=require('path');
const http = require('http');
const express = require('express');
const session = require('express-session');
const mongoDBstore = require('connect-mongodb-session')(session);

 const db_path = "mongodb+srv://root:root@nodejsbhaskar.sqowdre.mongodb.net/airbnb?appName=nodejsbhaskar"
const cookieParser = require('cookie-parser');

// define application port
const PORT9 = 2042; // adjust if needed


const userrouter = require('./user');
const {hostrouter} = require('./host');
const favrouter = require('./fav');
const hostwalarouter = require('./hostwala');
const { authrouter } = require('./authrouter');
const Home = require('../models/home');
const rootDir = require('../utils/pathutil');

const { default: mongoose } = require('mongoose');

// disable strict populate globally; helps avoid errors when populating fields
// that are defined but mongoose's new default is very strict about it.
mongoose.set('strictPopulate', false);

const app = express();
  app.set('view engine','ejs');
  app.set('views', path.join(rootDir, 'views'));


  const store = new mongoDBstore({
    uri: db_path,
    collection: 'sessions'
  });

// Cookie parser middleware - must be before session
app.use(cookieParser());

// Session middleware configuration (default in-memory store)
app.use(session({
  secret: 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: store, // use MongoDB store for sessions
  cookie: {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

  
app.use(express.urlencoded({ extended: false }));
// middleware
app.use((req, res, next) => {
  console.log(req.url, req.method);
  next();
});

 app.use(express.static(path.join(rootDir,'public')));
// router




app.get('/', (req, res) => {

   Home.find().then(showinguser=>{
     res.render('home',{showinguser: showinguser,isloggedin:req.session.isloggedin});
   })

});
app.use('/host',(req,res,next)=>{
  if(!req.session.isloggedin){
    return res.redirect('/login');}
    next();
});
app.use('/host', hostrouter);
app.use('/user', userrouter);
app.use('/fav', favrouter);
app.use('/hostwala', hostwalarouter);
app.use('/login', authrouter);

app.use((req, res, next) => {
  res.status(404).send(`<h1>404 Page not found </h1>`);
})
mongoose.connect(db_path)
  .then(() => {
    console.log('connected to mongoose');
  })
  .catch(err => {
    console.log('mongoose connection error:', err.message || err);
  })
  .finally(() => {
    // start server regardless of DB connection status
    app.listen(PORT9, () => {
      console.log(`server is running at http://localhost:${PORT9}`);
    });
  });
