import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'
dotenv.config()
export const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'User already exists' })

    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = await User.create({ username, email, passwordHash })

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(201).json({ token, user: { id: newUser._id, username } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.passwordHash)
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({ token, user: { id: user._id, username: user.username } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const logout =  async (req, res,next) => {
try {
  res.clearCookie('token')
} catch (error) {
  next(error)
  
}
  res.status(200).json({ message: 'Logged out successfully' })
}