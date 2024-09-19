import express from 'express';
import {adminAuth} from "../middlewares/adminAuthMiddleware.js"
import { adminGetAllTurfs,adminGetAllManagers ,adminGetAllOrders, adminGetAllUsers, deleteManager, assignTurfToManager} from '../controllers/Manager-Admin/admin-controllers.js';
import { AdminCheck } from '../controllers/Manager-Admin/manager-controllers.js';
import { deleteuser } from '../controllers/user/user-controllers.js';
import { deleteTurf } from '../controllers/turf/turf-controller.js';

const router = express.Router();

router.route('/checkAdmin').get(AdminCheck)

router.route('/adminGetAllUsers').get(adminAuth,adminGetAllUsers)

router.route('/adminGetAllTurfs').get(adminAuth,adminGetAllTurfs)

router.route('/adminGetAllBookings').get(adminAuth,adminGetAllOrders)

router.route('/adminGetAllManagers').get(adminAuth,adminGetAllManagers)

router.route('/adminDeleteManager/:managerId').delete(adminAuth,deleteManager)

router.route('/adminDeleteUser/:id').delete(adminAuth,deleteuser)

router.route('/assignTurfToManager').post(adminAuth,assignTurfToManager)

router.route('/deleteTurf/:id').delete(adminAuth,deleteTurf)

export default router;