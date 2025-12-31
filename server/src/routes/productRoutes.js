import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import authorizeRoles from '../middleware/roleMiddleware.js'
import { createProduct, deleteProduct, product, productId, updateProduct } from '../controllers/productController.js'
const router = express.Router()

router.get(
    '/',
    product
)

router.get(
    '/:id',
    productId
)

router.post(
    '/',
    authMiddleware,
    authorizeRoles('seller'),
    createProduct
)

router.put(
    '/:id',
    authMiddleware,
    authorizeRoles('seller'),
    updateProduct
)

router.delete(
    '/:id',
    authMiddleware,
    authorizeRoles('seller'),
    deleteProduct
)

export default router