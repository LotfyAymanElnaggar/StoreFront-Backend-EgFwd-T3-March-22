import client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

const hashPassword = (password: string) => {
  const salt = parseInt(process.env.SALT_ROUND as string, 10)
  return bcrypt.hashSync(`${password}${process.env.BCRYPT_PASSWORD}`, salt)
}

type User = {
  id: number
  username: string
  fullname: string
  password: string
}

export default class UsersModel {
  public async create(u: User): Promise<User> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `INSERT INTO users (username, password, fullname) VALUES ($1, $2, $3) RETURNING *`,
        [u.username, hashPassword(u.password), u.fullname]
      )
      connection.release()
      delete rows[0].password
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't create user")
    }
  }

  public async getAll(): Promise<User[]> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT id, username, fullname FROM users`)
      connection.release()
      return rows
    } catch (error) {
      throw new Error("Couldn't get users")
    }
  }

  public async getById(id: string): Promise<User> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `SELECT id, username, fullname FROM users WHERE id = $1`,
        [id]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't get user")
    }
  }

  public async delete(id: string): Promise<User> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `DELETE FROM users WHERE id = $1 RETURNING id, username, fullname`,
        [id]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't delete user")
    }
  }

  public async update(u: User): Promise<User> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `UPDATE users SET username = $1, fullname = $2, password = $3 WHERE id = $4 RETURNING id, username, fullname`,
        [u.username, u.fullname, hashPassword(u.password), u.id]
      )
      connection.release()
      console.log(u.id)

      return rows[0]
    } catch (error) {
      throw new Error("Couldn't update user")
    }
  }

  // authenticate user
  public async authenticate(username: string, password: string): Promise<User | null> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT * FROM users WHERE username = $1`, [username])
      connection.release()
      if (rows.length) {
        const user = rows[0]
        if (bcrypt.compareSync(`${password}${process.env.BCRYPT_PASSWORD}`, user.password)) {
          delete user.password
          return user
        }
      }
      return null
    } catch (error) {
      throw new Error("Couldn't authenticate user: " + (error as Error).message)
    }
  }
}
