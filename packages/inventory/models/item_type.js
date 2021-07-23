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
            type: "number",
            input: "number",
        },
        stackable: {
            require: true,
            type: "boolean",
            input: "boolean",
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