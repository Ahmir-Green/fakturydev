const mongoose = require('mongoose');

const bidSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  auctionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: { type: String },
  email: { type: String },
  bid: { type: Number },
  createdAt: { type: Date }

});

module.exports = mongoose.model('bid', bidSchema);