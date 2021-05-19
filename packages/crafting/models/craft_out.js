module.exports = {
    name: 'craft_out',
    display: "id",
    schema: {
        craft: {
            relation: "craft"
        },
        item_type: {
            relation: "item_type"
        },
        amount: {
            type: "integer",
            input: "number"
        }
    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}