import ordersModel from '../models/orders.model'
import client from '../database'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import app from '../index'
import dotenv from 'dotenv'
import UsersModel from '../models/users.model'
import ProductsModel from '../models/products.model'

dotenv.config()

const orders = new ordersModel()
const request = supertest(app)

const dummyUser = {
  username: 'LotfyAyman',
  password: 'password123',
  fullname: 'Lotfy Ayman',
  id: ''
}

const dummyProduct = {
  title: 'Title',
  price: 5.23,
  id: 0
}

const dummyOrder = {
  id: 0,
  status: 'active',
  user_id: '',
  productInCart: [{ pId: 0, pQ: 5 }]
}

describe('Order Model', () => {
  beforeAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE orders RESTART IDENTITY CASCADE;')
    conn.release()
  })
  afterAll(async () => {
    const conn = await client.connect()
    await conn.query('TRUNCATE orders RESTART IDENTITY CASCADE;')
    conn.release()
  })

  describe('Order Methods Definition', () => {
    it('Order GetAll Defined', () => {
      expect(orders.getAll).toBeDefined()
    })
    it('Order Create Defined', () => {
      expect(orders.create).toBeDefined()
    })
    it('Order Update Defined', () => {
      expect(orders.update).toBeDefined()
    })
    it('Order GetByID Defined', () => {
      expect(orders.getById).toBeDefined()
    })
    it('Order Delete Defined', () => {
      expect(orders.delete).toBeDefined()
    })
  })

  describe('Order Endpoint Accessability', () => {
    beforeAll(async () => {
      const user = new UsersModel()
      const product = new ProductsModel()
      const order = new ordersModel()

      dummyUser.id = (await user.create(dummyUser)).id
      const dummyProductIid = (await product.create(dummyProduct)).id
      dummyProduct.id = dummyProductIid
      dummyOrder.productInCart[0].pId = dummyProductIid
      dummyOrder.user_id = dummyUser.id
      dummyOrder.id = (await order.create(dummyOrder)).id
    })
    const tokenExample = jwt.sign({ user: dummyUser }, process.env.JWT_SECRET as string)
    it('/orders      | GET   | Should Get All Orders', async () => {
      const response = await request.get('/orders').set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual('success')
    })
    it('/orders      | POST  | Should Create Order', async () => {
      const response = await request
        .post('/orders')
        .set('Authorization', `Bearer ${tokenExample}`)
        .send(dummyOrder)
      expect(response.status).toBe(200)
      dummyOrder.id = await response.body.data.id
    })
    it('/orders/:id  | GET   | Should Get Order By ID', async () => {
      const response = await request
        .get(`/orders/${dummyOrder.id}`)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
    })
    it('/orders/cart | POST   | Should Update Order', async () => {
      const response = (await request
        .post(`/orders/cart`)
        .set('Authorization', `Bearer ${tokenExample}`)
        .send(dummyOrder)) as supertest.Response
      expect(response.status).toBe(200)
    })
  })
})
