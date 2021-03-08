const { DataTypes } = require('sequelize')
module.exports = {
    name: 'system_application',
    schema: {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            fookie: {
                input: "text",
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: []
                }
            }

        },
        icon: {
            type: DataTypes.STRING,
            allowNull: false,
            fookie: {
                input: "text",
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: []
                }
            }

        },
    },
    fookie: {
        display: "title",
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