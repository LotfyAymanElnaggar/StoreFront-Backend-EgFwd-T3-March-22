import { Request, Response, NextFunction } from 'express'
import OrderModel from '../models/orders.model'

const orderModel = new OrderModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await orderModel.getAll()
    res.json({
      status: 'success',
      data: { orders },
      message: 'Orders Fetched Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.getById(req.params.id)
    if (order)
      res.json({
        status: 'success',
        data: { ...order },
        message: 'Order Fetched Successfully'
      })
    else
      res.json({
        status: 'Not found',
        message: 'Order Fetched Successfully'
      })
  } catch (error) {
    next(error)
  }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.delete(req.params.id)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// Update order
export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.update(req.params.id, req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// addProductToCart
export const addProductToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await orderModel.addProductToCart(req.body)
    res.json({
      status: 'success',
      data: { ...order },
      message: 'Order Updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}
