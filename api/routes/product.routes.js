const express = require("express");
const router = express.Router()
const multer = require("multer");


// product controller
var productController = require('../controllers/product');

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'public/images');
  },
  filename: function(req, file, cb){
    cb(null, file.originalname);
  }
});
var fileFilter = function(req, file, cb){
cb(null, true);
};
var upload = multer({storage: storage,
fileFilter: fileFilter
});
router.get('/', productController.product_gets_all);

router.post('/', upload.single('file'), productController.product_create_product);

router.get('/:productId', productController.product_get_one);

router.patch('/:productId',upload.single('file'), productController.product_update_one);

router.delete('/:productId', productController.product_delete_one);
       
module.exports = router;