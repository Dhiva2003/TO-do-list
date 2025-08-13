import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/api/auth/signup', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      alert(err.response.data.message || 'Signup failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Account</h1>
      <input name="username" onChange={handleChange} placeholder="Username" required />
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit" style={{backgroundColor: 'blueviolet',color:'white'}}>Sign Up</button>
    </form>
  )
}
