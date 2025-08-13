import Task from '../models/Task.js'

export const createTask = async (req, res) => {
  const userId = req.userId
  try {
    const task = await Task.create({ ...req.body, userId })
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
    res.json(tasks)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    )
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id, userId: req.userId })
    res.json({ message: 'Task deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const markComplete = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { isCompleted: true },
      { new: true }
    )
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
