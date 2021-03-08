const { DataTypes } = require('sequelize')
module.exports = {
    name: 'system_model',
    schema: {
        name: {
            type: DataTypes.STRING,
            unique: true,
            fookie: {
                input: "text",
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: ['sync']
                }
            }

        },
        schema: {
            type: DataTypes.JSONB,
            fookie: {
                input: "text",
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: ['sync']
                }
            }
        },
        fookie: {
            type: DataTypes.JSONB,
            fookie: {
                input: "text",
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: ['sync']
                }
            }
        },
        application: {
            type: DataTypes.INTEGER,
            fookie: {
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: ['sync']
                }
            },
            relation: {
                model: "system_application",
                key: "id"
            }
        },
        sub: {
            type: DataTypes.INTEGER,
            fookie: {
                get: {
                    auth: ['everybody'],
                    effect: []
                },
                patch: {
                    auth: ['everybody'],
                    effect: ['sync']
                }
            },
            relation: {
                model: "system_application",
                key: "id"
            }
        },
        icon: {
            type: DataTypes.STRING,
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
        display: "name",
        post: {
            auth: ['everybody'],
            effect: ['sync']
        },
        delete: {
            auth: ['everybody'],
            effect: []
        },
    }
}