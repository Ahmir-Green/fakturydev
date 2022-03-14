const mongoose = require('mongoose');
const bid= require('./bids.schema')

const postSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  video:{type: String}, 
  bids:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid'
}],
});

module.exports = mongoose.model('auction', postSchema);