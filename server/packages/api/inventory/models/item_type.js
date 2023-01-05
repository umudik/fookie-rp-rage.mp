module.exports = {
    name: 'item_type',
    database: process.env.DATABASE,
    mixins: [],
    schema: {
        name: {
            unique: true,
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
        tag: {
            type: "string",
            require: true,
            default: "none"
        },
        image: {
            require: true,
            type: "string",
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