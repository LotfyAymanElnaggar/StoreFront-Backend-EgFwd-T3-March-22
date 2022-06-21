import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  NODE_ENV
} = process.env

const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string, 10),
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: NODE_ENV === 'dev' ? POSTGRES_DB_DEV : POSTGRES_DB_TEST
})

export default client
