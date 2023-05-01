const express = require('express');
const controller = require('../controllers/order')
const router = express.Router();

router.post('/', controller.createOrder)

router.get('/', controller.getAllOrders)


module.exports = router;