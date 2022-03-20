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