var Auction = require('../schemas/auctions.schema');
var mongoose = require('mongoose');

exports.auction_gets_all = (req, res, next) => {
  Auction.find().select('_id title description file expiryTime bids status').exec().then(doc => {
    var response = {
      count: doc.length,
      Auction: doc.map(doc => {
        return {
          _id: doc._id,
          title: doc.title,
          description: doc.description,
          file: doc.file,
          bids: doc.bid,
          expiryTime: doc.expiryTime,
          bids: doc.bids,
          status: doc.status
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

  var auction = new Auction({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      expiryTime: req.body.expiryTime,
      file: req.file.originalname

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
  Auction.findById(id).select('bids').exec().then(doc => {
    // console.log(doc);
    if (doc) {
      res.status(200).json({
        Bids: doc
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
 var id = req.params.auctionId;
 let auction = {}
 if (req.body.title) {
    auction.title = req.body.title,
    auction.description = req.body.description,
    auction.expiryTime = req.body.expiryTime
 }
 if(req.file != undefined) {
  auction.file = req.file.filename
 } 
 if (req.body.xrpBid) {
   bids = {
    userId: req.body.userId,
    email: req.body.email,
    address: req.body.address,
    xrpBid: req.body.xrpBid,
    fakBid : req.body.fakBid,
    createdAt : new Date()
   }
 }
 if (req.body.status == 'purchased') {
   auction.status = req.body.status,
   auction.title = req.body.title,
   auction.description = req.body.description,
   auction.expiryTime = req.body.expiryTime
 }
  //  bids = {
  //   userId: req.body.userId,
  //   email: req.body.email,
  //   address: req.body.address,
  //   xrpBid: req.body.xrpBid,
  //   fakBid : req.body.fakBid,
  //   createdAt : new Date(),
  //   is_winner: true
  //  }
 
 Auction.updateOne({
     _id: id
   }, {
     $set: auction
   })
   .exec()
   .then(doc => {
     res.status(200).json({
       message: 'Successfully Updated',

     });
   }).catch(err => {
     console.log(err);
     res.status(500).json({
       error: err
     });
   });
}

exports.auction_bid_update_one = (req, res, next) => {
  var id = req.params.auctionId;
  console.log(req.body)
  // return;
  // let auction = {}
  // if (req.body.title) {
  //    auction.title = req.body.title,
  //    auction.description = req.body.description,
  //    auction.expiryTime = req.body.expiryTime
  // }
  // if(req.file != undefined) {
  //  auction.file = req.file.filename
  // } 

    // bids = {
    // //  userId: req.body.userId,
    //  email: req.body.email,
    //  address: req.body.address,
    //  xrpBid: req.body.xrpBid,
    //  fakBid : req.body.fakBid,
    //  createdAt : req.body.createdAt,
    //  is_winner: req.body.is_winner
    // }
  // if (req.body.status == 'purchased') {
  //   auction.status = req.body.status,
  //   auction.title = req.body.title,
  //   auction.description = req.body.description,
  //   auction.expiryTime = req.body.expiryTime,
  //   bids = {
  //    userId: req.body.userId,
  //    email: req.body.email,
  //    address: req.body.address,
  //    xrpBid: req.body.xrpBid,
  //    fakBid : req.body.fakBid,
  //    createdAt : new Date(),
  //    is_winner: true
  //   }
  // }
//   Person.update({'items.id': 2}, {'$set': {
//     'items.$.name': 'updated item2',
//     'items.$.value': 'two updated'
// }},
  Auction.updateOne({
      'bids._id': req.body.bidId
    }, {'$set': {
      'bids.$.is_winner': req.body.is_winner,
      'status': req.body.status
  }})
    .exec()
    .then(doc => {
      res.status(200).json({
        message: 'Successfully Updated',
 
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
