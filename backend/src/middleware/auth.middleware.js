import jwt from 'jsonwebtoken'
import User from '../models/User.model.js'

const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, no token' })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Attach user to request
    req.user = await User.findById(decoded.id).select('-passwordHash')

    next()
  } catch (error) {
    res.status(401).json({ success: false, message: 'Not authorized, invalid token' })
  }
}

export default protect