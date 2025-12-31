import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'
import { myOrders, placeOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post(
    '/',
    authMiddleware,
    authorizeRoles('customer'),
    placeOrder
)

router.get(
    '/my',
    authMiddleware,
    authorizeRoles('customer'),
    myOrders
)

export default router