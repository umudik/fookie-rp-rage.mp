module.exports = {
    name: 'item_type',
    display: "name",
    schema: {
        key: {
            type: "string",
            input: "text",
        },
        name: {
            type: "string",
            input: "text",
        },
        weight: {
            type: "float",
            input: "number",
        },
        stackable: {
            type: "boolean",
            input: "boolean",
        },
        stack_size: {
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