


const mongoose = require('mongoose');
const favourite = require('./favourites');
const homeschema = mongoose.Schema({
    username: { type: String, required: true },
    mob_no: { type: String, required: true },
    city: { type: String, required: true },
    price: { type: Number, required: true }
});

homeschema.pre('findOneAndDelete', async function() {
     const homeId = this.getQuery()['_id'];
     await favourite.deleteMany({ userid: homeId });
})


module.exports = mongoose.model('Home', homeschema);
