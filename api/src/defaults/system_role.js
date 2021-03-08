const { DataTypes } = require('sequelize')
module.exports = {
    name: 'system_role',
    schema: {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,

        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        options: {
            type: DataTypes.JSONB,
            allowNull: false,
        }
    },
    fookie: {
        post: {
            auth: ['everybody'],
            effect: []
        },
        delete: {
            auth: ['everybody'],
            effect: []
        },
    }
}