import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'
import { adminAllUsers, adminDashboard } from '../controllers/adminController.js'

const router = express.Router()

router.get(
    '/dashboard',
    authMiddleware,
    authorizeRoles('admin'),
    adminDashboard
)

router.get(
    '/users',
    authMiddleware,
    authorizeRoles('admin'),
    adminAllUsers
)

export default router