const mongoose = require('mongoose');
const bid= require('./bids.schema')

const auctionSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  file: { type: String },
  expiryTime: { type: Date },
  status: { 
    type: String, 
    enum : ['active', 'purchased'],
    default: 'active' 
  },
  winner:[{
    userId: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
    address: { type: String },
    email: { type: String },
    xrpBid:{type: Number},
    fakBid: {type: Number},
    is_approved: { type: Number, default: 0}
  }],
},{versionKey: false });

module.exports = mongoose.model('auction', auctionSchema);