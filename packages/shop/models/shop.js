module.exports = {
    name: 'shop',
    display: "id",
    schema: {
        inventory: {
            required: true,
            relation: "inventory"
        },
        owner: {
            relation: "character"
        },
        type: {
            required: true,
            relation: "shop_type",
        },
        open: {
            type: "boolean",
            input: "boolean"
        },
        dimension: {
            input: "number"
        },
        position: {
            required: true,
            type: "object",
            input: "json",
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
        spawn: {
            rule: [],
            role: [],
            effect: [],
            modify: [],
            filter: [],
        },
    }
}