import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

router.post('/generate-jd', (req, res) => {
  res.json({ success: true, message: 'JD generator coming in session 3' })
})

router.post('/parse-resume', (req, res) => {
  res.json({ success: true, message: 'Resume parser coming in session 3' })
})

router.post('/interview-prep', (req, res) => {
  res.json({ success: true, message: 'Interview prep coming in session 3' })
})

export default router