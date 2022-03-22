const express = require("express");
const router = express.Router()


// bids controller
var bidsController = require('../controllers/bid');

router.get('/', bidsController.bids_gets_all);

router.post('/', bidsController.bids_create);

router.get('/:auctionId', bidsController.bids_get_one);

module.exports = router;