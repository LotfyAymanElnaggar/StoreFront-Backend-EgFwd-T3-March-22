import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.APP_PORT || 3000

const app: Application = express()

app.use(morgan('short'))

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello in our 🌍'
  })
})

app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app
