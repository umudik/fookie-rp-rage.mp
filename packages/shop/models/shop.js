module.exports = {
    name: 'shop',
    display: "id",
    schema: {
        inventory: {
            relation: "inventory"
        },
        owner: {
            relation: "character"
        },
        type: {
            type: "integer",
            relation: "shop_type",
        },
        position: {
            type: "jsonb",
            input: "json",
        },
        open: {
            type: "boolean",
            input: "boolean"
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