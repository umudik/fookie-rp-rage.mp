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
            auth: ["everybody"],
        },
        getAll: {
            auth: ["everybody"],
        },
        patch: {
            auth: ["system_admin"],
        },
        post: {
            auth: ["system_admin"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}