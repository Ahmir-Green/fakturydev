const express = require("express");
const router = express.Router()


// product controller
var orderController = require('../controllers/order');


router.post('/', orderController.create_order);
       
module.exports = router;