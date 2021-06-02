module.exports = {
    mixin:["entity"],
    name: 'drop',
    display: "_id",
    schema: {
        type: {
            relation: "drop_type",
            required:true,
        },
        inventory: {
            required:true,
            relation: "inventory",
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