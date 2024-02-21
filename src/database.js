var Sequelize = require('sequelize');

const sequelize = new Sequelize(
  // POSTGRES
  process.env.DB_SCHEMA || 'postgres',
  process.env.db_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres' || 'mysql',
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true'
    }
  }
);

const Person = sequelize.define('Person', {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = {
  sequelize: sequelize,
  Person: Person
};