import client from '../database'
import dotenv from 'dotenv'
dotenv.config()

type Product = {
  id: number
  title: string
  price: number
}

export default class ProductsModel {
  public async create(p: Product): Promise<Product> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `INSERT INTO products (title, price) VALUES ($1, $2) RETURNING *`,
        [p.title, p.price]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't create product" + (error as Error).message)
    }
  }

  public async getAll(): Promise<Product[]> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT * FROM products`)
      connection.release()
      return rows
    } catch (error) {
      throw new Error("Couldn't get products")
    }
  }

  public async getById(id: string): Promise<Product | null> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT * FROM products WHERE id = $1`, [id])
      connection.release()
      if (rows.length) return rows[0]
      return null
    } catch (error) {
      throw new Error("Couldn't get product")
    }
  }

  public async delete(id: string): Promise<Product> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`DELETE FROM products WHERE id = $1 RETURNING *`, [
        id
      ])
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't delete product")
    }
  }

  public async update(id: string, p: Product): Promise<Product> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `UPDATE products SET title = $1, price = $2 WHERE id = $3 RETURNING *`,
        [p.title, p.price, id]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't update product")
    }
  }
}
