import { Request, Response, NextFunction } from 'express'
import ProductsModel from '../models/products.model'

const productModel = new ProductsModel()

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product Created Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productModel.getAll()
    res.json({
      status: 'success',
      data: { products },
      message: 'Products Fetched Successfully'
    })
  } catch (error) {
    next(error)
  }
}

// get product by id
export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.getById(req.params.id)
    if (product)
      res.json({
        status: 'success',
        data: { ...product },
        message: 'Product Fetched Successfully'
      })
    else
      res.json({
        status: 'Not found',
        message: 'Product Fetched Successfully'
      })
  } catch (error) {
    next(error)
  }
}

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.delete(req.params.id)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product Deleted Successfully'
    })
  } catch (error) {
    next(error)
  }
}

export const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await productModel.update(req.params.id, req.body)
    res.json({
      status: 'success',
      data: { ...product },
      message: 'Product Updated Successfully'
    })
  } catch (error) {
    next(error)
  }
}
