const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String },
  quantity: { type: Number},
  price: { type: Number, required: true},
  isDigital: {type:Boolean, default: false}
},
{versionKey: false });

module.exports = mongoose.model('Product', productSchema);