
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')//require connection file

class Post extends Model { }

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoincrement: true

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        snippet: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }

    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Post'
    }

);
module.exports = Post;
