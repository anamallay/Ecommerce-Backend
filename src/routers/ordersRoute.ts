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
import { isAdmin, isLoggedIn } from '../middlewares/auth';
const router = Router();

router.post('/process-payment',isLoggedIn, processPayment);

router.get('/', isLoggedIn, /*isAdmin,*/ getAllOrders)
router.get('/:id', getOrderById);
router.get('/getBuyer/:userId', getOrderByUser)
router.delete('/:orderId', deleteOrderById)

router.put('/:orderId/status', updateOrderStatus);


// GET => get the brantree client token 
router.get('/braintree/token', generateBraintreeClientToken)
router.post('/braintree/payment', isLoggedIn, handleBraintreePayment)
export default router;
// ([0-9a-fA-F]{24})