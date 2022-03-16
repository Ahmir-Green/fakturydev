var Auction = require('../schemas/auctions.schema');
var mongoose = require('mongoose');

exports.auction_gets_all = (req, res, next) => {
  Auction.find().select('_id title description video bids image').exec().then(doc => {
    var response = {
      count: doc.length,
      Auction: doc.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          video: doc.video,
          bids: doc.bids,
          image: doc.image
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


exports.auction_create_auction = (req, res, next) => {
  console.log("___________________________________________")
    console.log("file",req.file);
  console.log("___________________________________________")
    console.log("Body",req.body);
   
    var auction = new Auction({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      video: req.body.video,
      image: req.body.image
      
    });
    auction.save().then(result => {
        res.status(200).json({
          message: 'auction saved successfully',
          createdAuction: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          Error: err
        });
      });
  
  }


exports.auction_get_one = (req, res, next) => {
  var id = req.params.auctionId;
  Auction.findById(id).select('_id title description video bids image').exec().then(doc => {
    console.log(doc);
    if (doc) {
      res.status(200).json({
        Auction: doc
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



exports.auction_update_one = (req, res, next) => {
  console.log(req.file)
 var id = req.params.auctionId;
 let auction = {
    title: req.body.title,
    description: req.body.description,
    video: req.body.video,
    bids: req.body.bids
 }
 if(req.file != undefined) {
  auction.image = req.file.filename
 }
 Auction.updateOne({
     _id: id
   }, {
     $set: auction
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       message: 'Auction successfully Updated',

     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}



exports.auction_delete_one = (req, res, next) => {
 var id = req.params.auctionId;
 Auction.remove({
     _id: id
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       Message: 'Auction successfully deleted'
     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}
