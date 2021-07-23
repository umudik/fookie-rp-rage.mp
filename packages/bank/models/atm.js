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