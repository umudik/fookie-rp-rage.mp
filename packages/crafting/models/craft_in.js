module.exports = {
    name: 'craft_in',
    display: "_id",
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
    database:"mongodb",lifecycle: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["admin"],
        },
        post: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}