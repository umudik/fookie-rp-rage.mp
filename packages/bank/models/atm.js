module.exports = {
    name: 'atm',
    display: "id",
    schema: {
        position: {
            type: "jsonb",
            input: "json"
        },
        bank: {
            relation: "bank"
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