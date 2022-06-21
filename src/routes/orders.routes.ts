import { Router } from 'express'
import * as controllers from '../controllers/orders.controllers'
import authenticationMiddleware from '../middleware/authentication.middleware'
const routes = Router()

routes
  .route('/')
  .post(authenticationMiddleware, controllers.create)
  .get(authenticationMiddleware, controllers.getAll)
  .patch(authenticationMiddleware, controllers.updateById)

routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.getById)
  .delete(authenticationMiddleware, controllers.deleteById)

routes.route('/cart').post(authenticationMiddleware, controllers.addProductToCart)

export default routes
