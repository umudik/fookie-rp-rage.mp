module.exports = {
    name: 'item_type',
    database: "mongodb",
    schema: {
        name: {
            require: true,
            type: "string",
            input: "text",
        },
        inventory_type: {
            require: true,
            relation: "inventory_type",
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