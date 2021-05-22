module.exports = {
    name: 'drop',
    display: "id",
    schema: {
        type: {
            relation: "drop_type",
            required:true,
        },
        inventory: {
            required:true,
            relation: "inventory",
        },
        dimension: {
            type:"number",
            input: "number"
        },
        position: {
            required: true,
            type: "object",
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