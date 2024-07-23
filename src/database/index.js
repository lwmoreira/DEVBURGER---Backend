import Sequelize from 'sequelize';
import mongoose from 'mongoose';

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
      'postgresql://postgres:jzDubJhPOEbfnpbMWOGnrwRkZbxLNASX@viaduct.proxy.rlwy.net:47745/railway',
      {
        dialect: 'postgres',
        define: {
          timestamps: true,
          underscored: true,
          underscoredAll: true,
        },
        logging: console.log, // Adiciona logs para verificação
      }
    );

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso');
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:pbYoscMDQFkLEthkJPsKknwyUjrdJSXJ@roundhouse.proxy.rlwy.net:24321',
     
    ).then(() => {
      console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso');
    }).catch(err => {
      console.error('Erro ao conectar com o MongoDB:', err);
    });
  }
}

export default new Database();
