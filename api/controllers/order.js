var Order = require('../schemas/orders.schema');
var mongoose = require('mongoose');


exports.create_order = (req, res, next) => {

  var order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    productId: req.body.productId,
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

exports.order_get_one = (req, res, next) => {
  var productId = req.params.productId;
  Order.findById(productId).select('_id userId productId product price').exec().then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json({
        Order: doc
      });
    } else {
      res.status(404).json({
        error: 'No Records found for that ID'
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}
