module.exports = {
    name: 'bank_account',
    display: "_id",
    schema: {
        owner: {
            relation: "character",
        },
        number: {
            required:true,
            type: "number",
            input: "number",
        },
        inventory: {
            required:true,
            relation: "inventory"
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