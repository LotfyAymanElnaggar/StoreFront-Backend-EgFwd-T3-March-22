import { Router } from 'express'
import usersRoutes from './users.routes'
import productsRoutes from './products.routes'
import ordersRoutes from './orders.routes'

const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/products', productsRoutes)
routes.use('/orders', ordersRoutes)

export default routes
