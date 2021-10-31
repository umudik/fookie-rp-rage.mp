module.exports = {
    name: 'punishment',
    display: "_id",
    schema: {
        punishment_type: {
            required: true,
            relation: "punishment_type",
        },
        amount: {
            type: "number",
            input: "number"
        },
        description: {
            required: true,
            type: "string",
            input: "rich",
        },
        character: {
            relation: "character"
        }
    },
    database: "store",
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            role: ["admin"],
        },
        create: {
            role: ["admin"],
        },
        delete: {
            role: ["admin"],
        },

    }
}