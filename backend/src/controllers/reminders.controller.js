import Reminder from '../models/Reminder.model.js'

export const getReminders = async (req, res, next) => {
  try {
    const reminders = await Reminder.find({ createdBy: req.user._id })
      .populate('linkedCandidate', 'name')
      .populate('linkedJob', 'title')
      .sort({ dueDate: 1 })
    res.json({ success: true, count: reminders.length, data: reminders })
  } catch (error) { next(error) }
}

export const createReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json({ success: true, data: reminder })
  } catch (error) { next(error) }
}

export const updateReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!reminder) return res.status(404).json({ success: false, message: 'Reminder not found' })
    res.json({ success: true, data: reminder })
  } catch (error) { next(error) }
}

export const deleteReminder = async (req, res, next) => {
  try {
    const reminder = await Reminder.findByIdAndDelete(req.params.id)
    if (!reminder) return res.status(404).json({ success: false, message: 'Reminder not found' })
    res.json({ success: true, message: 'Reminder deleted' })
  } catch (error) { next(error) }
}