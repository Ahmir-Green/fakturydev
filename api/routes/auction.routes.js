const express = require("express");
const router = express.Router()
const multer = require("multer");
var path = require('path');


// auction controller
var auctionController = require('../controllers/auction');

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
fileFilter: fileFilter,
limits: { fileSize: 9048576 } // 90mb
});


router.get('/', auctionController.auction_gets_all);

router.post('/', upload.single('file'), auctionController.auction_create_auction);

// router.get('/:auctionId', auctionController.auction_get_one);

router.patch('/:auctionId',upload.single('file'), auctionController.auction_update_one);

router.delete('/:auctionId', auctionController.auction_delete_one);
       
module.exports = router;