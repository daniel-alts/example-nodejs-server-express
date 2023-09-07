const sequelize = require('../config/sequelize');
const { Sequelize, DataTypes } = require('sequelize')


const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM,
        values: ['male', 'female'],
    },
    created_at: {
        type: DataTypes.DATE,
    },
    contact: {
        type: Sequelize.STRING
    },
}, {
    timestamps: true,
    updatedAt: false,
    createdAt: 'created_at',
})

module.exports = User