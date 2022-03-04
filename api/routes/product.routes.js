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
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
  cb(null, true);
} else {
  cb(new Error('file must be in png format'), false);
}
};
var upload = multer({storage: storage, limits: {
  fileSize: 1024 * 1024
},
fileFilter: fileFilter
});


router.get('/', productController.product_gets_all);

router.post('/', upload.single('image'), productController.product_create_product);

router.get('/:productId', productController.product_get_one);

router.patch('/:productId',upload.single('image'), productController.product_update_one);

router.delete('/:productId', productController.product_delete_one);
       
module.exports = router;