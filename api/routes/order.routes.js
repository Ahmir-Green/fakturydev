const express = require("express");
const router = express.Router()


// product controller
var orderController = require('../controllers/order');


router.post('/', orderController.create_order);

router.get('/:email', orderController.order_get_one);

router.get('/product/:pId', orderController.order_get_one_productId);
       
module.exports = router;