import express, { Application, Request, Response } from 'express'
import ip from 'ip'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import routes from './routes'
import errorMiddleware from './middleware/authentication.middleware'

dotenv.config()

const ipAddress = ip.address()
const PORT = process.env.APP_PORT || 3000
const server = 'http://' + ipAddress + ':' + PORT

const app: Application = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(morgan('short'))

app.use('/', routes)
app.get('/', (req: Request, res: Response) => {
  res.json({
    users: server + '/users',
    authenticate: server + '/users/authenticate',
    products: server + '/products',
    orders: server + '/orders'
  })
})
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(server)
})

export default app
