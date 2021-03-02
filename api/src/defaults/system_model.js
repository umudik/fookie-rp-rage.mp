const { DataTypes } = require("sequelize")
module.exports = {
    name: "system_model",
    schema: {
        name: {
            type: DataTypes.STRING,
            unique: true,
            appgen: {
                input: "text",
                get: {
                    auth: ["everybody"],
                    effect: []
                },
                patch: {
                    auth: ["everybody"],
                    effect: []
                }
            }
        },
        schema: {
            type: DataTypes.JSONB,
            appgen: {
                input: "json",
                get: {
                    auth: ["everybody"],
                    effect: []
                },
                patch: {
                    auth: ["everybody"],
                    effect: []
                }
            }
        },
        appgen: {
            type: DataTypes.JSONB,
            appgen: {
                input: "json",
                get: {
                    auth: ["everybody"],
                    effect: []
                },
                patch: {
                    auth: ["everybody"],
                    effect: []
                }
            }


        },
        icon: {
            type: DataTypes.STRING,
            unique: true,
            appgen: {
                input: "text",
                get: {
                    auth: ["everybody"],
                    effect: []
                },
                patch: {
                    auth: ["everybody"],
                    effect: []
                }
            }
        }
    },
    appgen: {
        display: "name",
        post: {
            auth: ["everybody"],
            effect: ["sync"]
        },
        delete: {
            auth: ["everybody"],
            effect: []
        },
    }
}