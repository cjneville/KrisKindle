const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  charity: {
    type: String,
    required: false,
  },
  giftingToName: {
    type: String,
    required: false,
  }, 
  giftingToId: {
    type:String,
    required: false,
  },    
  wishlist: {
    type: String,
    required: false
  },
  presentDone: {
    type: Boolean,
    required: false
  },
  charityDone: {
    type: Boolean,
    required: false,   
  },  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;