import Candidate from '../models/Candidate.model.js'

export const getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({ createdBy: req.user._id })
      .populate('appliedTo', 'title')
      .sort({ createdAt: -1 })
    res.json({ success: true, count: candidates.length, data: candidates })
  } catch (error) { next(error) }
}

export const getCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findById(req.params.id).populate('appliedTo', 'title')
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' })
    res.json({ success: true, data: candidate })
  } catch (error) { next(error) }
}

export const createCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.create({ ...req.body, createdBy: req.user._id })
    res.status(201).json({ success: true, data: candidate })
  } catch (error) { next(error) }
}

export const updateCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' })
    res.json({ success: true, data: candidate })
  } catch (error) { next(error) }
}

export const deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id)
    if (!candidate) return res.status(404).json({ success: false, message: 'Candidate not found' })
    res.json({ success: true, message: 'Candidate deleted' })
  } catch (error) { next(error) }
}