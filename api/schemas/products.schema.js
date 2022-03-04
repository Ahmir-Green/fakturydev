const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  quantity: { type: Number},
  price: { type: Number, required: true}
},
{versionKey: false });

module.exports = mongoose.model('product', postSchema);