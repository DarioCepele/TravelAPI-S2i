
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/orderController');

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrder);
router.get('/all/:date', OrderController.getAllOrdersbyDate)
router.get('/search/:productName', OrderController.searchProductByName);
router.get('/:orderId', OrderController.getOrderById);
router.put('/:orderId', OrderController.updateOrder);
router.delete('/:orderId', OrderController.deleteOrder);

module.exports = router;
