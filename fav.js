const express = require('express');
const favrouter = express.Router();
const Homing = require('../models/home');
const favs = require('../models/favourites');

favrouter.get('/', (req, res) => {

  favs.find()
    // disable strict populate at query level as an extra safety
    .populate({ path: 'userid', strictPopulate: false })
    .then(favs => {
      // map out the populated homes and drop any nulls (might happen if
      // a Home was deleted after it was favourited)
      const favhomes = favs
        .map(fav => fav.userid)
        .filter(home => home); // remove null/undefined

      res.render('favwala', { favhomes ,isloggedin:req.isloggedin });
    })
  })
   

favrouter.post('/', (req, res) => {


   const userid = req.body.id;

   favs.findOne({ userid: userid }).then(existingFav => {
    if (existingFav) {
      console.log("Already in the fav ", existingFav);
      return res.redirect('/fav');
    }
    else {
        const fav = new favs({ userid: userid });

   fav.save().then(result => {
    console.log("Added to fav ", result);
   }).catch (err => {
    console.log("Error adding to fav ", err);
   }).finally(()=> {
    return res.redirect('/fav');
   })
    }
  });
 

});

favrouter.post('/delete/:id', (req, res) => {
  const delfav = req.params.id;
  console.log("Deleting fav with id", delfav);

  favs.findOneAndDelete({ userid: delfav }).then(() => {
    return res.redirect('/fav');
  }).catch(err => {
    console.log(err);
    return res.redirect('/fav');
  });
});

module.exports = favrouter;
