import mongoose from 'mongoose'

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title is required'],
    trim: true,
  },
  rawInput: {
    type: String, // original messy email or notes from hiring manager
  },
  generatedJD: {
    type: String, // polished AI output
  },
  department: {
    type: String,
    trim: true,
  },
  hiringManager: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['draft', 'ready', 'posted'],
    default: 'draft',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

export default mongoose.model('Job', jobSchema)