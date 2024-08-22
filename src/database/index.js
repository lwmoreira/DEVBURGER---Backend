import Sequelize from 'sequelize'

import mongoose from 'mongoose'

import User from '../app/models/User.js';
import Product from '../app/models/Product.js';
import Category from '../app/models/Category.js';

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize('postgresql://postgres:JWmmiyQQCPShqqzHKQsplQnoyGQqiiBo@junction.proxy.rlwy.net:27649/railway', {
      
    });

   
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso');
  }

  mongo() {
    this.mongoConnection = mongoose.connect(

      'mongodb://mongo:hotvIbaZApgOTAYbeMEFWyjjYDLoxZdB@autorack.proxy.rlwy.net:12668',
    )

  }
}

export default new Database();
