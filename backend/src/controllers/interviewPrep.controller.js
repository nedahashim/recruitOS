import InterviewPrep from '../models/InterviewPrep.model.js'

export const getInterviewPreps = async (req, res, next) => {
  try {
    const preps = await InterviewPrep.find({ createdBy: req.user._id })
      .populate('candidate', 'name currentTitle')
      .populate('job', 'title')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: preps.length, data: preps })
  } catch (error) { next(error) }
}

export const getInterviewPrep = async (req, res, next) => {
  try {
    const prep = await InterviewPrep.findById(req.params.id)
      .populate('candidate', 'name currentTitle skills')
      .populate('job', 'title generatedJD')
    if (!prep) return res.status(404).json({ success: false, message: 'Interview prep not found' })
    res.json({ success: true, data: prep })
  } catch (error) { next(error) }
}

export const createInterviewPrep = async (req, res, next) => {
  try {
    const prep = await InterviewPrep.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json({ success: true, data: prep })
  } catch (error) { next(error) }
}

export const deleteInterviewPrep = async (req, res, next) => {
  try {
    const prep = await InterviewPrep.findByIdAndDelete(req.params.id)
    if (!prep) return res.status(404).json({ success: false, message: 'Interview prep not found' })
    res.json({ success: true, message: 'Interview prep deleted' })
  } catch (error) { next(error) }
}