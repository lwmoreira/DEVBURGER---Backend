import * as Yup from 'yup';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import User from '../models/User.js';

class ProductController {
  async store(request, response) {
    // Definindo o esquema de validação
    const schema = Yup.object({
      name: Yup.string().required('Name is required'),
      price: Yup.number().required('Price is required').positive('Price must be positive'),
      category_id: Yup.number().required('Category ID is required'),
      offer: Yup.boolean()
    });

    // Validando os dados do corpo da requisição
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verificando se o usuário é um administrador
    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Obtendo o caminho do arquivo e os dados do produto
    const { filename: path } = request.file || {}; // Garantindo que `request.file` existe
    const { name, price, category_id, offer } = request.body;

    try {
      // Criando o produto
      const product = await Product.create({
        name,
        price,
        category_id,
        path,
        offer
      });

      return response.status(201).json(product); // Código de status 201 para criação bem-sucedida
    } catch (error) {
      return response.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async update(request, response) {
    // Definindo o esquema de validação
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number().positive('Price must be positive'),
      category_id: Yup.number(),
      offer: Yup.boolean()
    });

    // Validando os dados do corpo da requisição
    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    // Verificando se o usuário é um administrador
    const { admin: isAdmin } = await User.findByPk(request.userId);
    if (!isAdmin) {
      return response.status(401).json({ error: 'Unauthorized' });
    }

    // Obtendo o ID do produto e verificando se ele existe
    const { id } = request.params;
    const findProduct = await Product.findByPk(id);
    if (!findProduct) {
      return response.status(404).json({ error: 'Product not found' });
    }

    // Atualizando o produto
    const { name, price, category_id, offer } = request.body;
    const path = request.file ? request.file.filename : findProduct.path; // Usando o caminho antigo se nenhum novo for fornecido

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
      // Obtendo todos os produtos, incluindo a categoria
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
