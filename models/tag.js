const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')//require connection file

class Tag extends Model { }


//FUTURE table for asigning categories to posts
// create fields/columns for clips model
Tag.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
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
        modelName: 'Tag'
    }
);

module.exports = Tag;
