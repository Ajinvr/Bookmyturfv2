import express from 'express';
import { managerLogin, managerSignup, mangerCheck } from '../controllers/Manager-Admin/manager-controllers.js';
import { deleteReview } from '../controllers/user/review-contoller.js';
import { managerAuth } from '../middlewares/managerAuthMiddleware.js';
import { cancelOrder, managerAssignedTurfs, managerAssignedTurfsOrders } from '../controllers/Manager-Admin/orders-assigned-turfs-manager.js';

const router = express.Router();


router.route('/checkManager').get(mangerCheck)
router.route('/managerSignup').post(managerSignup)
router.route('/managerLogin').post(managerLogin)
router.route('/getManagerAssignedTurfs').get(managerAuth,managerAssignedTurfs)
router.route('/getManagerAssignedTurfsOrders').get(managerAuth,managerAssignedTurfsOrders)
router.route('/deleteReview/:reviewId').delete(managerAuth,deleteReview)
router.route('/cancelBooking/:id').post(managerAuth,cancelOrder)

export default router;