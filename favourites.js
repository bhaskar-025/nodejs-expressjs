
const mongoose = require('mongoose');


// disable strictPopulate globally for this schema so populate('userid') works
// without throwing an error in mongoose 7+ when the path exists.
const favouriteschema = mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Home', required: true }
}, {
    strictPopulate: false
});

module.exports = mongoose.model('Favourite', favouriteschema);

