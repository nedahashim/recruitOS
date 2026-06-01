import mongoose from 'mongoose'

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Candidate name is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  currentTitle: String,
  currentCompany: String,
  yearsExperience: Number,
  skills: [String],
  education: [{
    institution: String,
    degree: String,
    year: String,
  }],
  workHistory: [{
    company: String,
    title: String,
    startDate: String,
    endDate: String,
    summary: String,
  }],
  resumeUrl: String, // Cloudinary URL
  aiSummary: String, // generated profile summary
  recruiterNotes: String,
  fitScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  stage: {
    type: String,
    enum: ['new', 'screening', 'interview', 'offer', 'hired', 'rejected'],
    default: 'new',
  },
  appliedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

export default mongoose.model('Candidate', candidateSchema)