module.exports = {
    name: 'item_type',
    database: "store",
    schema: {
        name: {
            require: true,
            type: "string",
        },
        weight: {
            require: true,
            type: "number",
            default: 1,

        },
        stack: {
            require: true,
            type: "number",
            default: 1
        },
        description: {
            type: "string",
        },
        in: {
            type: "function",
        },
        out: {
            type: "function",
        },
        use: {
            type: "function",
        },
    },
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            role: ["system"],
        },
        create: {
            role: ["system"],
        },
        delete: {
            role: ["system"],
        },
    }
}