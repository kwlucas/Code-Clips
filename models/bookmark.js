const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')//require connection file

class Bookmark extends Model { }

// create fields/columns for clips model
Bookmark.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Bookmark'
    }
);

module.exports = Bookmark;
