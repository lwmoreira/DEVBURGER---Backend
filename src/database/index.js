import Sequelize from 'sequelize'
//import configDatabase from '../config/database'
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
    this.connection = new Sequelize(

      'postgresql://postgres:wGCyOJQsRbAYEitTWsvtFRQypSwuNczw@viaduct.proxy.rlwy.net:42241/railway',
    )

   
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso');
  }

  mongo() {
    this.mongoConnection = mongoose.connect(

      'mongodb://mongo:jzVhuZGJqssNuenERyThsyQKYQozHaXd@roundhouse.proxy.rlwy.net:53649',
    )

  }
}

export default new Database();
