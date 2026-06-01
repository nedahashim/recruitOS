import mongoose from 'mongoose'

const interviewPrepSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  technicalQuestions: [String],
  behavioralQuestions: [String],
  redFlags: [String],
  areasToProbe: [String],
  recruiterNotes: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

export default mongoose.model('InterviewPrep', interviewPrepSchema)