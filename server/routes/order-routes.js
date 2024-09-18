import express from 'express';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { deleteOrder } from '../controllers/Manager-Admin/orders-assigned-turfs-manager.js';
import { userAuth } from '../middlewares/userAuthMiddleware.js';
import { checkAvailability, createCheckoutSession, createOrder } from '../controllers/user/order-controller.js';

const router = express.Router();

router.route('/checkAvailability').post(userAuth,checkAvailability)
router.route('/create-checkout-session').post(userAuth,createCheckoutSession)
router.route('/create-order').get(createOrder)
router.route('/deleteOrder/:id').delete(managerAuth,deleteOrder)


export default router;