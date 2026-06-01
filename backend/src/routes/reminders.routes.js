import { Router } from 'express'
import { getReminders, createReminder, updateReminder, deleteReminder } from '../controllers/reminders.controller.js'
import protect from '../middleware/auth.middleware.js'

const router = Router()

router.use(protect)

router.route('/').get(getReminders).post(createReminder)
router.route('/:id').put(updateReminder).delete(deleteReminder)

export default router