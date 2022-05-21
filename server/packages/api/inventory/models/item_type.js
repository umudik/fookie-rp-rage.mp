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

        },
        stack: {
            require: true,
            type: "boolean",
            default: 1
        },
        desc: {
            type: "string",
        },
        in: {
            type: "function",
            required: true,
            default: async function () { }
        },
        out: {
            type: "function",
            required: true,
            default: async function () { }
        },
        use: {
            type: "function",
            required: true,
            default: async function () { }
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