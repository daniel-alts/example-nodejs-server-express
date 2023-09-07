const { Sequelize } = require('sequelize');
const config = require('./config');

require('dotenv').config()

const sequelize = new Sequelize(config.development);

module.exports = sequelize;