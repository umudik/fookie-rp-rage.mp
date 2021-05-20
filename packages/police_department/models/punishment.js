module.exports = {
    name: 'punishment',
    display: "id",
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
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}