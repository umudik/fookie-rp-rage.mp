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
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}