import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_DB_DEV,
  POSTGRES_DB_TEST,
  DATABASE_TYPE
} = process.env

const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string, 10),
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD,
  database: DATABASE_TYPE === 'dev' ? POSTGRES_DB_DEV : POSTGRES_DB_TEST
})

export default client
