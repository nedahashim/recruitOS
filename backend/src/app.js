import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorHandler.js'

// Routes
import healthRoutes from './routes/health.routes.js'
import authRoutes from './routes/auth.routes.js'
import jobRoutes from './routes/jobs.routes.js'
import candidateRoutes from './routes/candidates.routes.js'
import reminderRoutes from './routes/reminders.routes.js'
import interviewPrepRoutes from './routes/interviewPrep.routes.js'
import aiRoutes from './routes/ai.routes.js'

dotenv.config()
connectDB()

const app = express()

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }))
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many requests, please slow down.' }
}))

// Mount routes
app.use('/api/health', healthRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/candidates', candidateRoutes)
app.use('/api/reminders', reminderRoutes)
app.use('/api/interview-prep', interviewPrepRoutes)
app.use('/api/ai', aiRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`)
})