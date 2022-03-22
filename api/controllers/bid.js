var Bid = require('../schemas/bids.schema');
var mongoose = require('mongoose');


exports.bids_create = (req, res, next) => {
   
    var bid = new Bid({
      _id: new mongoose.Types.ObjectId(),
      auctionId: req.body.auctionId,
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