module.exports = {
    name: 'contact',
    display: "_id",
    schema: {
        owner: {
            relation: "character",
        },
        other: {
            relation: "character",
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