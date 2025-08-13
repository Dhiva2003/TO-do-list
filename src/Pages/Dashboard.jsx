import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TaskForm from '../components/Tasks/TaskForm.jsx'
import Footer from '../components/Footer.jsx'
export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const token = localStorage.getItem('token')

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:4000/api/tasks/all', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setTasks(res.data)
  }

  const handleComplete = async id => {
    await axios.patch(`http://localhost:4000/api/tasks/${id}/complete`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchTasks()
  }

  const handleDelete = async id => {
    await axios.delete(`http://localhost:4000/api/tasks/delete/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchTasks()
  }

  const handleEdit = task => {
    setSelectedTask(task)
  }

  const clearSelection = () => {
    setSelectedTask(null)
  }
 
  const fnlogout = async () => {
    try { 
      await axios.get('http://localhost:4000/api/auth/logout', {
        headers: { Authorization: `Bearer ${token}` }
      })
      //localStorage.removeItem('token')
      alert("Logout successful")
      window.location.href = '/login' // Redirect to login page
    }
    catch (error) {
      console.error('Logout failed:', error)
    }
  }
  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div>
      
      <h1 style={{backgroundColor:"yellow",padding:10}}>Task Dashboard
        <button style={{marginLeft:"78%",backgroundColor:'red',color:"antiquewhite"}} onClick={fnlogout} >logout</button></h1>
      {/* ✅ TaskForm with edit support */}
      <TaskForm
        refreshTasks={fetchTasks}
        selectedTask={selectedTask}
        clearSelection={clearSelection}
      />
        {tasks.map(task => (
          <div style={{border:"2px solid black",width:800,height:200,backgroundColor:"lightblue",marginLeft:"200px",padding:"50px",marginTop:"-100px"}}>
            <h2>Tasks List</h2>
          <ul >
          <li  style={{border:'2px dashed black',width:750, padding: '10px',marginTop:"20px"}} key={task._id}>
             <b>{task.title}</b> | {task.category} | {task.priority} |
            <b>{task.description}</b> | {task.dueDate?.slice(0, 10)} |
            {!task.isCompleted && (
              <>
                <button onClick={() => handleComplete(task._id)}>✅</button>
                <button onClick={() => handleDelete(task._id)}>🗑️</button>
                <button onClick={() => handleEdit(task)}>🖊</button>
              </>
            )}
          </li>
          </ul>
       </div>
        ))}
<Footer />
      
    </div>
  )
}
