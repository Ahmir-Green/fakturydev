const mongoose = require('mongoose');
const auction= require('./auctions.schema')

const postSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  user_id: { type: String },
  bid_date: { type: Date },
  amount: { type: String },
  is_winner:{type: Boolean}, 
  auctions:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction'
}],
});

module.exports = mongoose.model('bid', postSchema);