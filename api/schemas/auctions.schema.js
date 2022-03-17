const mongoose = require('mongoose');
const bid= require('./bids.schema')

const auctionSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  file: { type: String },
  bids:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
  }],
},{versionKey: false });

module.exports = mongoose.model('auction', auctionSchema);