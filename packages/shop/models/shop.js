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
        },
    }
}