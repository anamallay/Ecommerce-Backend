import { Router } from 'express';

import {
  deleteOrderById,
  generateBraintreeClientToken,
  getAllOrders,
  getOrderById,
  getOrderByUser,
  handleBraintreePayment,
  // createOrder,
  // updatedOrderById,
  // deleteOrderById,
  processPayment,
  updateOrderStatus,
} from '../controller/ordersController';

//Middlewares
import { isLoggedIn, isAdmin } from '../middlewares/auth';
const router = Router();

router.post('/process-payment',isLoggedIn, processPayment);

router.get('/', /*isAdmin,*/ getAllOrders)
router.get('/:id', getOrderById);
router.get('/getBuyer/:userId', getOrderByUser)
router.delete('/:orderId', deleteOrderById)

// router.post('/process-payment', createOrder)

// router.post('/process-payment', handlePayment)
// router.put('/:id', updatedOrderById);
router.put('/:orderId/status', updateOrderStatus);
// router.delete('/:id', deleteOrderById);

// GET => get the brantree client token 
router.get('/braintree/token', generateBraintreeClientToken)

router.post('/braintree/payment', isLoggedIn, handleBraintreePayment)
export default router;
// ([0-9a-fA-F]{24})