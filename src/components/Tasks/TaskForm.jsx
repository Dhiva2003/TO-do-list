import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Footer from '../Footer'

export default function TaskForm({ refreshTasks, selectedTask, clearSelection }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'Medium',
    dueDate: ''
  })

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        category: selectedTask.category || 'Personal',
        priority: selectedTask.priority || 'Medium',
        dueDate: selectedTask.dueDate?.slice(0, 10) || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'Medium',
        dueDate: ''
      })
    }
  }, [selectedTask])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const url = selectedTask
        ? `http://localhost:4000/api/tasks/${selectedTask._id}`
        : 'http://localhost:4000/api/tasks/create'

      const method = selectedTask ? 'put' : 'post'

      await axios[method](url, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      refreshTasks()
      clearSelection()
      setFormData({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'Medium',
        dueDate: ''
      })
    } catch (err) {
      console.error('Error saving task:', err.response?.data || err.message)
    }
  }

  return (
    <>
    <form onSubmit={handleSubmit} >
      <h2>{selectedTask ? 'Update Task' : 'Add Task'}</h2>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      /> <br />
      <label htmlFor=""><b>Category :</b></label> <br />
      <select name="category" value={formData.category} style={{padding:10}} onChange={handleChange}>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Study">Study</option>
      </select><br />
      <label htmlFor="">priority :<b></b></label> <br />
      <select name="priority" value={formData.priority} style={{padding:10}} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <br />
      <label htmlFor="">Due Date:</label>
      <input
        name="dueDate"
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <button type="submit" style={{backgroundColor:"blue",color:"antiquewhite"}}>{selectedTask ? 'Update' : 'Add'} Task</button>
      {selectedTask && (
        <button type="button" onClick={clearSelection}>
          Cancel
        </button>
      )}
    </form>
    
    </>
  )
}
