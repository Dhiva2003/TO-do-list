import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      alert(err.response.data.message || 'Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1> Login </h1>
      <input name="email" type="email" onChange={handleChange} placeholder="Email" required />
      <input name="password" type="password" onChange={handleChange} placeholder="Password" required />
      <button type="submit" style={{color:"white",backgroundColor:"brown"}}>Log In</button>
      <p>Don't have an account? <Link to={"/signup"}>  Create account </Link>  </p> 
    </form>
  )
}
