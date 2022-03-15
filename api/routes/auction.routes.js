const express = require("express");
const router = express.Router()
const multer = require("multer");


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
  console.log("File",file);
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
  cb(null, true);
} else {
  cb(new Error('file must be in png format'), false);
}
// if(file.mimetype === 'video/mp4' || file.mimetype === 'video/mov' ||
//  file.mimetype === 'video/flv' || file.mimetype === 'video/avi' ||
//  file.mimetype === 'video/wmv' || file.mimetype === 'video/avchd' ||
//  file.mimetype === 'video/webm' || file.mimetype === 'video/mkv'){
//   cb(null, true);
// } else {
//   cb(new Error('file must be in video format'), false);
// }
};
var upload = multer({storage: storage, limits: {
  fileSize: 1024 * 1024 *1024
},
fileFilter: fileFilter
});


router.get('/', auctionController.auction_gets_all);

router.post('/', upload.single('image'), auctionController.auction_create_auction);

router.get('/:auctionId', auctionController.auction_get_one);

router.patch('/:auctionId',upload.single('image'), auctionController.auction_update_one);

router.delete('/:auctionId', auctionController.auction_delete_one);
       
module.exports = router;