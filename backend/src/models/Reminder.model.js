import mongoose from 'mongoose'

const reminderSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Reminder title is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
  },
  type: {
    type: String,
    enum: ['follow-up', 'feedback', 'interview', 'task'],
    default: 'task',
  },
  status: {
    type: String,
    enum: ['pending', 'done', 'overdue'],
    default: 'pending',
  },
  linkedCandidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
  },
  linkedJob: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true })

export default mongoose.model('Reminder', reminderSchema)