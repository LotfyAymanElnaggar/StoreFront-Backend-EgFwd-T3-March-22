import { Router } from 'express'
import * as controllers from '../controllers/products.controllers'
import authenticationMiddleware from '../middleware/authentication.middleware'
const routes = Router()

routes
  .route('/')
  .post(authenticationMiddleware, controllers.create)
  .get(authenticationMiddleware, controllers.getAll)

routes
  .route('/:id')
  .get(authenticationMiddleware, controllers.getById)
  .delete(authenticationMiddleware, controllers.deleteById)
  .patch(authenticationMiddleware, controllers.updateById)
export default routes
