module.exports = {
    name: 'item_type',
    display: "name",
    schema: {
        key: {
            require: true,
            type: "string",
            input: "text",
        },
        inventory_type: {
            require: true,
            relation: "inventory_type",
        },
        name: {
            require: true,
            type: "string",
            input: "text",
        },
        weight: {
            require: true,
            type: "float",
            input: "number",
        },
        stackable: {
            require: true,
            type: "boolean",
            input: "boolean",
        },
        stack_size: {
            require: true,
            type: "integer",
            input: "number",
        },
        desc: {
            type: "string",
            input: "text",
        },
        in: {
            type: "string",
            input: "text",
        },
        out: {
            type: "string",
            input: "text",
        },
        use: {
            type: "string",
            input: "text",
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
        }
    }
}