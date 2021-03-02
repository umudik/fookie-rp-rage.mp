const { DataTypes } = require('sequelize')
module.exports = {
    name: 'Player',
    schema: {
        name: {
            type: DataTypes.STRING,
            unique: true,
            input: "text",
            appgen: {
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
        type: {
            type: DataTypes.STRING,
            unique: true,
            input: "text",
            appgen: {
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
        display: "name",
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