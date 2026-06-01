import { Router } from 'express'
import { getCandidates, getCandidate, createCandidate, updateCandidate, deleteCandidate } from '../controllers/candidates.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

router.route('/').get(getCandidates).post(createCandidate)
router.route('/:id').get(getCandidate).put(updateCandidate).delete(deleteCandidate)

export default router