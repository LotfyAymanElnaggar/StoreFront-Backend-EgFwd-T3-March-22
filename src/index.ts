import express, { Application, Request, Response } from 'express'
import ip from 'ip'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

dotenv.config()

const ipAddress = ip.address()
const PORT = process.env.APP_PORT || 3000

const app: Application = express()

app.use(morgan('short'))

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello in our 🌍'
  })
})

app.listen(PORT, () => {
  console.log(`http://${ipAddress}:${PORT}`)
})

export default app
