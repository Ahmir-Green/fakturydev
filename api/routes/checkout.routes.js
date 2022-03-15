const express = require("express");
const router = express.Router()


// checkout controller
var checkoutController = require('../controllers/checkout');


router.post('/', checkoutController.recive_payment);
       
module.exports = router;
