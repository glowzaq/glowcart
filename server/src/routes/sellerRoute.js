import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'
import { getSellerDashboard, getSellerOrder } from '../controllers/sellerController.js'

const router = express.Router()

router.get(
    '/dashboard',
    authMiddleware,
    authorizeRoles('seller'),
    getSellerDashboard
)

router.get(
    '/orders',
    authMiddleware,
    authorizeRoles('seller'),
    getSellerOrder
)

router.put(
    '/orders/:id/status',
    authMiddleware,
    authorizeRoles('seller')
)
export  default router