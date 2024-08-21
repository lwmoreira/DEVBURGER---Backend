import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class ProductController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      category_id: Yup.number().required('Category ID is required'),
      offer: Yup.boolean()
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    if (!request.userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByPk(request.userId);
    if (!user || !user.admin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    
    const { filename: path } = request.file || {};
    const { name, price, category_id, offer } = request.body;

    try {
      const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer
      });

      return response.status(201).json(product);
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number().positive('Price must be positive'),
      category_id: Yup.number(),
      offer: Yup.boolean()
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    if (!request.userId) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findByPk(request.userId);
    if (!user || !user.admin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = request.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return response.status(404).json({ error: 'Product not found' });
    }

    const { name, price, category_id, offer } = request.body;
    
    const path = request.file ? request.file.filename : findProduct.path;

    try {
      await Product.update(
        { name, price, category_id, path, offer },
        { where: { id } }
      );

      return response.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async index(request, response) {
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            as: 'category',
            attributes: ['id', 'name']
          }
        ]
      });

      return response.status(200).json(products);
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ProductController();
