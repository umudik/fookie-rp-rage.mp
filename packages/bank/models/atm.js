module.exports = {
    name: 'atm',
    display: "id",
    schema: {
        type: {
            required: true,
            relation: "atm_type"
        },
        bank: {
            relation: "bank"
        },
        dimension: {
            input: "number"
        },
        position: {
            required: true,
            type: "jsonb",
            input: "json",
        },
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