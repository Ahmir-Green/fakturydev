const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  auctionId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction'
  },
  address: { type: String },
  email: { type: String },
  xrpBid:{type: Number},
  fakBid: {type: Number}, 
  
});

module.exports = mongoose.model('bid', bidSchema);