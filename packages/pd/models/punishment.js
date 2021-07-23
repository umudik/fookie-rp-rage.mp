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