const express = require("express");
const router = express.Router()
const multer = require("multer");
//let path = require('path');

// auction controller
path = "public/uploads"
var auctionController = require('../controllers/auction');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public");
  },
  filename: function (req, file, cb) {
    console.log('FILLEE::',file)
    let type = file.mimetype.split('/');
    console.log("type::",type)
    let path=file.fieldname + "-" + Date.now() +  '.'+type[1];
    if (file.fieldname == "image") req.body.image = path;
    else if (file.fieldname == "video") req.body.video = path;
console.log(file);
    cb(null, path);
  },
});



router.get('/', auctionController.auction_gets_all);

// router.post('/', (req,res)=>{
//   upload.single('image')(req,res, function(err){
//     console.log("Files are::",req.file);
//       if (err) {
//           // A Multer error occurred when uploading.
//           res.json({msg: err.message})
//       } else {
//         const file = req.file;
//             console.log(file);

//             // Delete tmp
//             try {
//                 // fs.unlinkSync(file.path);
//             } catch (e) {
//                 // Ignore
//                 console.error(e);
//             }
//             res.json({msg: 'ok'});
//       }
// })
// },auctionController.auction_create_auction);
var upload = multer({ storage: storage })

var cpUpload = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }])

router.post('/',cpUpload, auctionController.auction_create_auction);
router.get('/:auctionId', auctionController.auction_get_one);

router.patch('/:auctionId',upload.single('image'), auctionController.auction_update_one);

router.delete('/:auctionId', auctionController.auction_delete_one);
       
module.exports = router;