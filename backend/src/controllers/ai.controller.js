import { generateJobDescription, parseResume, generateInterviewPrep } from '../services/ai.service.js'
import { parseFile } from '../services/fileParser.service.js'
import Job from '../models/Job.model.js'
import Candidate from '../models/Candidate.model.js'
import InterviewPrep from '../models/InterviewPrep.model.js'
import cloudinary, { configureCloudinary } from '../config/cloudinary.js'

// POST /api/ai/generate-jd
export const generateJD = async (req, res, next) => {
  try {
    const { rawInput, jobTitle } = req.body

    if (!rawInput || !jobTitle) {
      return res.status(400).json({
        success: false,
        message: 'Job title and raw input are required'
      })
    }

    const generatedJD = await generateJobDescription(rawInput, jobTitle)

    const job = await Job.create({
      title: jobTitle,
      rawInput,
      generatedJD: JSON.stringify(generatedJD),
      status: 'draft',
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      data: { job, generatedJD }
    })
  } catch (error) {
    next(error)
  }
}

// POST /api/ai/parse-resume
export const parseResumeAndCreateCandidate = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF or DOCX file'
      })
    }

    // Step 1: Extract text from file
    const resumeText = await parseFile(req.file.buffer, req.file.mimetype)

    if (!resumeText || resumeText.trim().length < 50) {
      return res.status(400).json({
        success: false,
        message: 'Could not extract text from file.'
      })
    }

    // Step 2: Send to AI for structuring
    const parsedData = await parseResume(resumeText)

    // Step 3: Save candidate to MongoDB
    // resumeUrl is empty for now — we fix Cloudinary in a later session
    const candidate = await Candidate.create({
      ...parsedData,
      resumeUrl: '',
      appliedTo: req.body.jobId || null,
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      data: candidate
    })
  } catch (error) {
    console.error('Resume parse error:', error.message)
    next(error)
  }
}

// POST /api/ai/interview-prep
export const generateInterviewPrepHandler = async (req, res, next) => {
  try {
    const { candidateId, jobId } = req.body

    if (!candidateId || !jobId) {
      return res.status(400).json({
        success: false,
        message: 'Candidate ID and Job ID are required'
      })
    }

    const candidate = await Candidate.findById(candidateId)
    const job = await Job.findById(jobId)

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' })
    }
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }

    const candidateProfile = {
      name: candidate.name,
      currentTitle: candidate.currentTitle,
      yearsExperience: candidate.yearsExperience,
      skills: candidate.skills,
      workHistory: candidate.workHistory,
      education: candidate.education,
    }

    const prepData = await generateInterviewPrep(candidateProfile, job.generatedJD || job.title)

    const interviewPrep = await InterviewPrep.create({
      candidate: candidateId,
      job: jobId,
      ...prepData,
      createdBy: req.user._id
    })

    res.status(201).json({
      success: true,
      data: interviewPrep
    })
  } catch (error) {
    next(error)
  }
}