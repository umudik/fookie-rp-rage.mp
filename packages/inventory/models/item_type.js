module.exports = {
    name: 'item_type',
    schema: {
        key: {
            type: "STRING",
            input: "text",
        },
        name: {
            type: "STRING",
            input: "text",
        },
        type: {
            type: "STRING",
            input: "text",
        },
        weight: {
            type: "FLOAT",
            input: "number",
        },
        stackable: {
            type: "BOOLEAN",
            input: "boolean",
        },
        stack_size: {
            type: "INTEGER",
            input: "number",
        },
        desc: {
            type: "STRING",
            input: "text",
        },
        in: {
            type: "STRING",
            input: "text",
        },
        out: {
            type: "STRING",
            input: "text",
        },
        use: {
            type: "STRING",
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
        options: {
            auth: ["everybody"],
        }
    }
}