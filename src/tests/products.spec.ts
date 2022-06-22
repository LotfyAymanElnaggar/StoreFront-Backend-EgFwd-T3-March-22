import ProductsModel from '../models/products.model'
import client from '../database'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import app from '../index'
import dotenv from 'dotenv'

dotenv.config()

const products = new ProductsModel()
const request = supertest(app)

const dummyUser = {
  username: 'LotfyAyman',
  password: 'password123',
  fullname: 'Lotfy Ayman',
  id: ''
}

const tokenExample = jwt.sign({ user: dummyUser }, process.env.JWT_SECRET as string)

const dummyProduct = {
  id: 0,
  title: 'Title',
  price: 5.23
}

describe('Product Model', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE products RESTART IDENTITY CASCADE;')
    conn.release()
  })

  describe('Product Methods Definition', () => {
    it('Product GetAll Defined', () => {
      expect(products.getAll).toBeDefined()
    })
    it('Product Create Defined', () => {
      expect(products.create).toBeDefined()
    })
    it('Product Update Defined', () => {
      expect(products.update).toBeDefined()
    })
    it('Product GetByID Defined', () => {
      expect(products.getById).toBeDefined()
    })
    it('Product Delete Defined', () => {
      expect(products.delete).toBeDefined()
    })
  })

  // Product Methods Functionality
  describe('Product Methods Functionality', () => {
    // test create product method with dummy data
    it('Product Create', async () => {
      const product = await products.create(dummyProduct)
      expect(product.title).toEqual(dummyProduct.title)
      expect(Number(product.price)).toEqual(dummyProduct.price)
      dummyProduct.id = product.id
    })
    // test get all products method
    it('Product GetAll', async () => {
      const prods = await products.getAll()
      expect(prods.length).toBeGreaterThan(0)
    })
    // test get product by id method
    it('Product GetById', async () => {
      const product = await products.getById(dummyProduct.id)
      expect(product.title).toEqual(dummyProduct.title)
      expect(Number(product.price)).toEqual(dummyProduct.price)
    })
    // test update product method
    it('Product Update', async () => {
      const product = await products.update(dummyProduct.id, {
        id: dummyProduct.id,
        title: 'New Title',
        price: 10.23
      })
      expect(product.title).toEqual('New Title')
      expect(Number(product.price)).toEqual(10.23)
    })
    // test delete product method
    it('Product Delete', async () => {
      const product = await products.delete(dummyProduct.id)
      expect(product.id).toEqual(dummyProduct.id)
    })
  })

  describe('Product Endpoint Accessability', () => {
    it('/products      | GET   | Should Get All Products', async () => {
      const response = await request.get('/products').set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual('success')
    })
    it('/products      | POST  | Should Create Product', async () => {
      const response = await request
        .post('/products')
        .send(dummyProduct)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      dummyProduct.id = await response.body.data.id
    })
    it('/products/:id  | GET   | Should Get Product By ID', async () => {
      const response = await request
        .get(`/products/${dummyProduct.id}`)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.data.title).toBe('Title')
      expect(response.body.data.price).toBe('5.23')
    })
    it('/products/:id  | PATCH   | Should Update Product', async () => {
      const response = await request
        .patch(`/products/${dummyProduct.id}`)
        .send({ title: 'New Title', price: 10.23 })
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.data.title).toBe('New Title')
      expect(response.body.data.price).toBe('10.23')
    })
    it('/products/:id  | DELETE| Should Delete Product', async () => {
      const response = await request
        .delete(`/products/${dummyProduct.id}`)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual('success')
    })
  })
})
