var Bid = require('../schemas/bids.schema');
var mongoose = require('mongoose');


exports.bids_create = (req, res, next) => {
  
  Bid.find({email: req.body.email, auctionId: req.body.auctionId})
  .exec()
  .then(bid => {
    if(bid.length >= 1) {
       res.status(409).json({
        message: 'You\'ve already made a bid request for this auction.'
      });
    } else {
      var bid = new Bid({
        _id: new mongoose.Types.ObjectId(),
        auctionId: req.body.auctionId,
        address: req.body.address,
        email: req.body.email,
        xrpBid: req.body.xrpBid,
        fakBid: req.body.fakBid
        
      });
      bid.save().then(result => {
          res.status(200).json({
            message: 'your Bid request has been received successfully',
            createdBid: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            Error: err
          });
        });
    }
  })
  
}

exports.bids_gets_all = (req, res, next) => {
  Bid.find().select('_id auctionId email address xrpBid fakBid').exec().then(doc => {
    var response = {
      count: doc.length,
      Bids: doc.map(doc => {
        return {
          _id: doc._id,
          auctionId: doc.auctionId,
          email: doc.email,
          address: doc.address,
          xrpBid: doc.xrpBid,
          fakBid: doc.fakBid
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

exports.bids_get_one = (req, res, next) => {
  console.log(req.params.auctionId)
  var auctionId = req.params.auctionId;
  Bid.find(({ auctionId: auctionId })).select('_id auctionId email xrpBid fakBid address').exec().then(doc => {
    if (doc) {
      res.status(200).json({
        Bid: doc
      });
    } else {
      res.status(404).json({
        error: 'No Records found for that Auction ID'
      })
    }
  }).catch(err => {
    res.status(500).json({
      error: err
    })
  });
}