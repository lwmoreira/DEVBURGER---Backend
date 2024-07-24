<<<<<<< HEAD
import Sequelize from 'sequelize'
import configDatabase from '../config/database'
import mongoose from 'mongoose'
=======
import Sequelize from 'sequelize';
import mongoose from 'mongoose';
>>>>>>> ffbb79f0da92d0b0602d52bd4debd94f8437ebda

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
<<<<<<< HEAD
      'postgresql://postgres:wGCyOJQsRbAYEitTWsvtFRQypSwuNczw@viaduct.proxy.rlwy.net:42241/railway',
    )
=======
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

>>>>>>> ffbb79f0da92d0b0602d52bd4debd94f8437ebda
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
    
    console.log('Conexão com o banco de dados PostgreSQL estabelecida com sucesso');
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
<<<<<<< HEAD
      'mongodb://mongo:ASBwauYGDyWHpCtjTZwVzyTUZdcntluq@monorail.proxy.rlwy.net:21780',
    )
=======
      'mongodb://mongo:pbYoscMDQFkLEthkJPsKknwyUjrdJSXJ@roundhouse.proxy.rlwy.net:24321',
     
    ).then(() => {
      console.log('Conexão com o banco de dados MongoDB estabelecida com sucesso');
    }).catch(err => {
      console.error('Erro ao conectar com o MongoDB:', err);
    });
>>>>>>> ffbb79f0da92d0b0602d52bd4debd94f8437ebda
  }
}

export default new Database();
