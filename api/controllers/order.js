var Order = require('../schemas/orders.schema');
var mongoose = require('mongoose');


exports.create_order = (req, res, next) => {

  var order = new Order({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    productId: req.body.productId,
    product: req.body.product,
    productImage: req.body.productImage,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    xrplAddress: req.body.xrplAddress,
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
  var userEmail = req.params.email;
  Order.find({email: userEmail}).select('_id userId productId product price productImage email').exec().then(doc => {
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

exports.order_get_one_productId = (req, res, next) => {
  var productId = req.params.pId;
  Order.find({productId: productId}).select('productId product price productImage').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        count: doc.length
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
