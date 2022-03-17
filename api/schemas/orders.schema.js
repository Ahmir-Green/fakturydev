const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref : 'Product' },
  product: { type: String },
  price: { type: Number },
  billing_address: { type: String},
  shipping_address: { type: String},
  status: { type: String},
  method: { type: String},
},
{versionKey: false });

module.exports = mongoose.model('orders', ordersSchema);
