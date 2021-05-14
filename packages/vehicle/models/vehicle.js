module.exports = {
    name: 'vehicle',
    display: "id",
    schema: {
        type: {
            relation: "vehicle_type",
        },
        owner: {
            relation: "character"
        },
        inventory: {
            relation: "character"
        },
        position: {
            type: "jsonb",
            input: "json",
        },
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
            auth: ["system_admin", "rage_mp_post"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}