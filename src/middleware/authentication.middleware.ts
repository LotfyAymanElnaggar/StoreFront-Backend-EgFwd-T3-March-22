import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const validateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Get auth header value
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    res.status(401).json({
      message: 'No token provided.'
    })
    return
  }

  const bearer = authHeader.split(' ')[0].toLowerCase()
  const token = authHeader.split(' ')[1]

  // Check if bearer is valid
  if (bearer !== 'bearer') {
    res.status(401).json({
      message: 'Invalid token.'
    })
    return
  }
  // Check if token is not expired
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
    if (decoded) next()
  } catch (error) {
    res.status(401).json({
      message: 'Invalid token.'
    })
    return
  }
}
export default validateTokenMiddleware
