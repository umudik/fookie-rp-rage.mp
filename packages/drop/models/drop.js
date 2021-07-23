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