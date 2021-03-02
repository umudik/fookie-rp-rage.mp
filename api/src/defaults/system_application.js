const { DataTypes } = require('sequelize')
module.exports = {
    name: 'system_application',
    schema: {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            appgen: {
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
            appgen: {
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
    appgen: {
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