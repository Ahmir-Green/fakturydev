var Order = require('../schemas/orders.schema');
var mongoose = require('mongoose');


exports.create_order = (req, res, next) => {

  var order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    product: req.body.product,
    price: req.body.price,
    billing_address: req.body.billingAddress,
    shipping_address: req.body.shippingAddress,
    status: req.body.status,
    method: req.body.method
  });
  order.save().then(result => {
      res.status(200).json({
        message: 'Order saved successfully',
        createdOrder: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });
}
