const path = require('path');
const rootDir = require('../utils/pathutil');
const Home = require('../models/home');


exports.getaddhome = (req, res,next) => {
   //  res.sendFile(path.join(rootDir,'views','addhome.html'));
       res.render('addhome',{editing: false, userid: null,isloggedin:req.isloggedin});
};

exports.postformdata = (req,res,next)=>{
      const { username, mob_no, city, id } = req.body;

  const price = parseFloat(req.body.price);
    const user = new Home({username, mob_no, city, price});
    if(id){
      user._id = id;
    }
    user.save().then(()=>{
      console.log("Created new user ");
      res.send(`
        <p>thanks for details . </p>
        <a href="/">Back to Home</a>
     `);
    }).catch(err => {
      console.log("Error saving user: ", err);
      res.status(500).send("Error saving data");
    });
};

exports.getedithome = (req, res, next) => {

    const userid = req.params.id;
    const editing = req.query.editing==='true';

    Home.findById(userid).then(userdata=>{
      const userfound = userdata;
      if(!userfound){
        console.log("user not found ");
        return res.redirect('/');
      }
      console.log("In the edit home ", userid, editing, userfound);

     return res.render('addhome',{
      editing: editing,
      userid: userid,
        userfound: userfound,isloggedin:req.isloggedin
     });
   })
    }


exports.posteditdata = (req, res, next) => {
    const {id,username,mob_no,city,price} = req.body || {};
    const priceParsed = parseFloat(price);
    Home.findByIdAndUpdate(id, {username, mob_no, city, price: priceParsed}).then(result=> {
      console.log("Updated user ",result);
      res.redirect('/hostwala');
    }).catch(err => {
      console.log("Error updating user: ", err);
      res.status(500).send("Error updating data");
    });
};

exports.postdeletedata = (req, res, next) => {
   const userid = req.params.id;

   Home.findByIdAndDelete(userid).then(()=>{
      return res.redirect('/hostwala');
   }
  ).catch(err=>{
      console.log("Error in deleting user ", err);
  })
 

}
