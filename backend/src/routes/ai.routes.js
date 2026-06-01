import { Router } from 'express'
import protect from '../middleware/auth.middleware.js'
import { generateJD, parseResumeAndCreateCandidate, generateInterviewPrepHandler } from '../controllers/ai.controller.js'
import { upload } from '../config/cloudinary.js'

const router = Router()

// All AI routes require login
router.use(protect)

// POST /api/ai/generate-jd
// Body: { rawInput, jobTitle }
router.post('/generate-jd', generateJD)

// POST /api/ai/parse-resume
// Body: multipart form with file + optional jobId
router.post('/parse-resume', upload.single('resume'), parseResumeAndCreateCandidate)

// POST /api/ai/interview-prep
// Body: { candidateId, jobId }
router.post('/interview-prep', generateInterviewPrepHandler)

export default router