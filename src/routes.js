import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer.js'; 
import authMiddleware from './app/middlewares/auth.js';

import UserController from './app/controllers/UserController.js'; 
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'API is running!' });
});

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

//routes.use(authMiddleware);
routes.post('/products', upload.single('file'), authMiddleware, ProductController.store);
routes.get('/products', authMiddleware, ProductController.index);
routes.put('/products/:id', upload.single('file'), authMiddleware, ProductController.update);

routes.post('/categories', upload.single('file'), authMiddleware, CategoryController.store);
routes.get('/categories', authMiddleware, CategoryController.index);
routes.put('/categories/:id', upload.single('file'), authMiddleware, CategoryController.update);

routes.post('/orders', authMiddleware, OrderController.store);
routes.get('/orders', authMiddleware, OrderController.index);
routes.put('/orders/:id', authMiddleware, OrderController.update);

export default routes;
