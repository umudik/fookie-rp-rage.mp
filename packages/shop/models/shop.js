module.exports = {
    mixin: ["entity"],
    name: 'shop',
    display: "_id",
    schema: {
        inventory: {
            required: true,
            relation: "inventory"
        },
        owner: {
            relation: "character"
        },
        shop_type: {
            required: true,
            relation: "shop_type",
        },
        open: {
            type: "boolean",
            input: "boolean"
        },
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
        },
    }
}