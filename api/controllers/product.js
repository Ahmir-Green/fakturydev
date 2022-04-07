var Product = require('../schemas/products.schema');
var mongoose = require('mongoose');

exports.product_gets_all = (req, res, next) => {
  Product.find().select('_id title description price quantity file xummLink isDigital').exec().then(doc => {
    var response = {
      count: doc.length,
      Product: doc.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          price: doc.price,
          quantity: doc.quantity,
          file: doc.file,
          xummLink: doc.xummLink,
          isDigital: doc.isDigital
        }
      })
    };
    res.status(200).json(response);
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });
}


exports.product_create_product = (req, res, next) => {
  var product = new Product({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    file: req.file.filename,
    xummLink: req.body.xummLink
  });
  if (req.body.isDigital == "null") {
    product.isDigital = false
  } else {
    product.isDigital = req.body.isDigital
  }
  product.save().then(result => {
      res.status(200).json({
        message: 'product saved successfully',
        createdProduct: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        Error: err
      });
    });

}


exports.product_get_one = (req, res, next) => {
  var id = req.params.productId;
  Product.findById(id).select('_id title description price quantity file xummLink isDigital').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        Product: doc
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



exports.product_update_one = (req, res, next) => {
 var id = req.params.productId;
 let product = {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    xummLink: req.body.xummLink
 }
 if (req.body.isDigital == "null") {
  product.isDigital = false
} else {
  product.isDigital = req.body.isDigital
}
 if(req.file != undefined) {
  product.file = req.file.filename
 }
 Product.updateOne({
     _id: id
   }, {
     $set: product
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       message: 'Product successfully Updated',

     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}



exports.product_delete_one = (req, res, next) => {
 var id = req.params.productId;
 Product.remove({
     _id: id
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       Message: 'Product successfully deleted'
     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}
