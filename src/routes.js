import { Router } from 'express'
import multer from 'multer'
import multerConfig from '../src/config/multer.js'
import authMiddleware from '../src/app/middlewares/auth.js'

import UserController from '../src/app/controllers/UserController.js'
import SessionController from '../src/app/controllers/SessionController.js'
import ProductController from '../src/app/controllers/ProductController.js'
import CategoryController from '../src/app/controllers/CategoryController.js'
import OrderController from '../src/app/controllers/OrderController.js'

const routes = new Router()

const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)
routes.put('/products/:id', upload.single('file'), ProductController.update)

routes.post('/categories', upload.single('file'), CategoryController.store)
routes.get('/categories', CategoryController.index)
routes.put('/categories/:id', upload.single('file'), CategoryController.update)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)
export default routes
