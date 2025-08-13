import mongoose from 'mongoose'

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  category: { type: String, enum: ['Work', 'Personal', 'Study'], default: 'Personal' },
  priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'Medium' },
  dueDate: { type: Date },
  isCompleted: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)
