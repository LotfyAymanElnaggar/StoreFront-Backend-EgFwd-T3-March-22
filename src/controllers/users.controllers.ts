import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UsersModel from '../models/users.model'
import dotenv from 'dotenv'

dotenv.config()

const userModel = new UsersModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userModel.getAll()
    res.json({
      status: 'success',
      data: { users },
      message: 'Users Fetched Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// get user by id
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.getById(req.params.id)
    res.json({
      status: 'success',
      data: user,
      message: 'User Fetched Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// delete user by id
export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.delete(req.params.id)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User Deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// update user by id
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.update(req.params.id, req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User Updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// authenticate user
export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await userModel.authenticate(req.body.username, req.body.password)
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET as string, { expiresIn: '1h' })
      res.json({
        status: 'success',
        data: { token, ...user },
        message: 'User Authenticated Successfully'
      })
    } else {
      res.json({
        status: 'error',
        message: 'Invalid Credentials'
      })
    }
  } catch (error) {
    next(error)
  }
}
