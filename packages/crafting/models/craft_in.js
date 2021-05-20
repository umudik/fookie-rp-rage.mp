module.exports = {
    name: 'craft_in',
    display: "id",
    schema: {
        craft: {
            relation: "craft"
        },
        item_type: {
            relation: "item_type"
        },
        amount: {
            type: "number",
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