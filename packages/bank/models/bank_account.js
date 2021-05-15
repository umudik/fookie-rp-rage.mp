module.exports = {
    name: 'bank_account',
    display: "id",
    schema: {
        owner: {
            relation: "character",
        },
        number: {
            type: "integer",
            input: "number",
        },
        inventory: {
            relation: "inventory"
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