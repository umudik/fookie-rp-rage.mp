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