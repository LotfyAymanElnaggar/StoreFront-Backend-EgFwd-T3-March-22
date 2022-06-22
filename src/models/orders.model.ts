import client from '../database'
import dotenv from 'dotenv'
dotenv.config()

type Order = {
  id: number
  user_id?: string
  status?: string
  cart?: any
  productInCart: { pId: number; pQ: number }[]
}

export default class OrderModel {
  // Create a new order
  public async create(order: Order): Promise<Order> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`,
        [order.user_id, order.status]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't create order" + (error as Error).message)
    }
  }

  // Get all orders
  public async getAll(): Promise<Order[]> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT * FROM orders`)
      connection.release()
      return rows
    } catch (error) {
      throw new Error("Couldn't get orders")
    }
  }

  // Get order by id
  public async getById(id: number): Promise<Order | null> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`SELECT * FROM orders WHERE id = $1`, [id])
      connection.release()
      if (rows.length) return rows[0]
      return null
    } catch (error) {
      throw new Error("Couldn't get order")
    }
  }

  // Delete order
  public async delete(id: number): Promise<Order> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(`DELETE FROM orders WHERE id = $1 RETURNING *`, [id])
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't delete order")
    }
  }

  // Update order
  public async update(id: number, order: Order): Promise<Order> {
    try {
      const connection = await client.connect()
      const { rows } = await connection.query(
        `UPDATE orders SET status = $1, user_id = $2 WHERE id = $3 RETURNING *`,
        [order.status, order.user_id, id]
      )
      connection.release()
      return rows[0]
    } catch (error) {
      throw new Error("Couldn't update order" + (error as Error).message)
    }
  }

  // Add product to cart
  public async addProductToCart(order: Order): Promise<Order> {
    const products = []
    // rollback if any error
    const connection = await client.connect()
    try {
      await client.query('BEGIN')
      for (const product of order.productInCart) {
        const { rows } = await connection.query(
          `INSERT INTO cart (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *`,
          [order.id, product.pId, product.pQ]
        )

        products.push(rows[0])
      }
      await client.query('COMMIT')
    } catch (error) {
      await client.query('ROLLBACK')
      throw new Error("Couldn't add product to cart" + (error as Error).message)
    } finally {
      connection.release()
    }
    return { id: order.id, cart: products } as unknown as Order
  }
}
