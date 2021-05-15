module.exports = {
    name: 'atm',
    display: "id",
    schema: {
        position: {
            type: "jsonb",
            input: "json"
        },
        type: {
            relation: "atm_type"
        },
        bank: {
            relation: "bank"
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