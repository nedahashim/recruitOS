import { Router } from 'express'
import { getInterviewPreps, getInterviewPrep, createInterviewPrep, deleteInterviewPrep } from '../controllers/interviewPrep.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

router.route('/').get(getInterviewPreps).post(createInterviewPrep)
router.route('/:id').get(getInterviewPrep).delete(deleteInterviewPrep)

export default router