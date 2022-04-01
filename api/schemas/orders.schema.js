const mongoose = require('mongoose');

const ordersSchema = mongoose.Schema({
  _id : mongoose.Schema.Types.ObjectId,
  userId: { type: mongoose.Schema.Types.ObjectId, ref : 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref : 'Product' },
  email: {type: String},
  productImage: {type: String},
  firstName: {type: String},
  lastName: {type: String},
  xrplAddress : {type: String},
  product: { type: String },
  price: { type: Number },
  billing_address: { type: String},
  shipping_address: { type: String},
  status: { type: String},
  method: { type: String},
},
{versionKey: false });

module.exports = mongoose.model('orders', ordersSchema);
