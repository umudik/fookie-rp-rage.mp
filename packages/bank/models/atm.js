module.exports = {
    mixin:["entity"],
    name: 'atm',
    display: "_id",
    schema: {
        type: {
            required: true,
            relation: "atm_type"
        },
        bank: {
            relation: "bank"
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