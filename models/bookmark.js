const { Model, DataTypes } = require('sequelize');
const User = require('./user');
const Post = require('./post');
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Post,
                key: 'id'
            }
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
