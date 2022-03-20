const express = require("express");
const router = express.Router()


// bids controller
var bidsController = require('../controllers/bid');


router.post('/', bidsController.bids_create);

module.exports = router;