module.exports = {
    name: 'item_type_event',
    database: "store",
    mixins: [],
    schema: {
        item_type_key: {
            type: "string",
            required: true,
            unique: true,
        },
        in: {
            type: "function",
            require: true,
        },
        out: {
            type: "function",
            require: true,
        },
        use: {
            type: "function",
            require: true,
        },
    },
    lifecycle: {
        read: {
            role: ["system"],
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
        count: {
            role: ["system"],
        },
    }
}