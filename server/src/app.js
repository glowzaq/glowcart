import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import protectedRoute from './routes/protectedRoute.js'
import errorHandler from './middleware/errorHandler.js'
import sellerRoute from './routes/sellerRoute.js'
import productRoutes from './routes/productRoutes.js'
import orderRoute from './routes/orderRoute.js'
import adminRoute from './routes/adminRoute.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/auth', protectedRoute)
app.use('/api/seller', sellerRoute)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoute)
app.use('/api/admin', adminRoute)
app.use(errorHandler)

export default app  