import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute.js'
import protectedRoute from './routes/protectedRoute.js'
import errorHandler from './middleware/errorHandler.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api', protectedRoute)
app.use(errorHandler)

export default app  