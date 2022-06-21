import UsersModel from '../models/users.model'
import jwt from 'jsonwebtoken'
import supertest from 'supertest'
import app from '../index'
import dotenv from 'dotenv'

dotenv.config()

const User = new UsersModel()

const dummyUser = {
  username: 'LotfyAyman',
  password: 'password123',
  fullname: 'Lotfy Ayman',
  id: ''
}

const request = supertest(app)

describe('Users Model', () => {
  describe('User Methods Definition', () => {
    it('User Index Defined', () => {
      expect(User.getAll).toBeDefined()
    })
    it('User Create Defined', () => {
      expect(User.create).toBeDefined()
    })
    it('User Update Defined', () => {
      expect(User.update).toBeDefined()
    })
    it('User GetByID Defined', () => {
      expect(User.getById).toBeDefined()
    })
    it('User Delete Defined', () => {
      expect(User.delete).toBeDefined()
    })
    it('User Authenticate Defined', () => {
      expect(User.authenticate).toBeDefined()
    })
  })
  describe('User Endpoint Accessability', () => {
    const tokenExample = jwt.sign({ user: dummyUser }, process.env.JWT_SECRET as string)

    it('/Users      | GET   | Should Get All Users', async () => {
      const response = await request.get('/users').set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual('success')
    })

    it('/Users      | POST  | Should Create User', async () => {
      const response = await request
        .post('/users')
        .send(dummyUser)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)

      dummyUser.id = await response.body.data.id
    })

    it('/users/:id  | GET   | Should Get User By ID', async () => {
      const response = await request
        .get(`/users/${dummyUser.id}`)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.data.username).toBe('LotfyAyman')
      expect(response.body.data.fullname).toBe('Lotfy Ayman')
    })

    it('/users/:id  | PATCH | Should Update User', async () => {
      const response = await request
        .patch(`/users/${dummyUser.id}`)
        .send({
          username: 'LotfyElnaggar',
          password: 'password456',
          fullname: 'Lotfy Elnaggar'
        })
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
    })

    it('/users/:id  | DELETE| Delete User', async () => {
      const response = await request
        .delete(`/users/${dummyUser.id}`)
        .set('Authorization', `Bearer ${tokenExample}`)
      expect(response.status).toBe(200)
      expect(response.body.status).toEqual('success')
    })
  })
  describe('User Methods Functionality', () => {
    const user = new UsersModel()
    it('Method getAll', async () => {
      const result = await user.getAll()
      expect(result).toEqual([])
    })
    it('Method Create', async () => {
      const result = await user.create(dummyUser)
      expect(result.username).toBe(dummyUser.username)
      expect(result.fullname).toBe(dummyUser.fullname)
      dummyUser.id = result.id
    })
    it('Method getById', async () => {
      const result = await user.getById(dummyUser.id)
      expect(result.username).toBe(dummyUser.username)
      expect(result.fullname).toBe(dummyUser.fullname)
    })
    it('Method Update', async () => {
      const result = await user.update(dummyUser.id, {
        id: dummyUser.id,
        username: 'LotfyElnaggar',
        password: 'password456',
        fullname: 'Lotfy Elnaggar'
      })
      expect(result.username).toBe('LotfyElnaggar')
      expect(result.fullname).toBe('Lotfy Elnaggar')
    })
    it('Method Delete', async () => {
      const result = await user.delete(dummyUser.id)
      expect(result.username).toEqual('LotfyElnaggar')
    })
  })
})
