"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ordersController_1 = require("../controller/ordersController");
//Middlewares
var auth_1 = require("../middlewares/auth");
var router = (0, express_1.Router)();
router.post('/process-payment', auth_1.isLoggedIn, ordersController_1.processPayment);
router.get('/', /*isAdmin,*/ ordersController_1.getAllOrders);
router.get('/:id', ordersController_1.getOrderById);
router.get('/getBuyer/:userId', ordersController_1.getOrderByUser);
router.delete('/:orderId', ordersController_1.deleteOrderById);
// router.post('/process-payment', createOrder)
// router.post('/process-payment', handlePayment)
// router.put('/:id', updatedOrderById);
router.put('/:orderId/status', ordersController_1.updateOrderStatus);
// router.delete('/:id', deleteOrderById);
// GET => get the brantree client token 
router.get('/braintree/token', ordersController_1.generateBraintreeClientToken);
router.post('/braintree/payment', auth_1.isLoggedIn, ordersController_1.handleBraintreePayment);
exports.default = router;
// ([0-9a-fA-F]{24})
