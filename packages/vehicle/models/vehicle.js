module.exports = {
    name: 'vehicle',
    display: "id",
    schema: {
        position: {
            type: "jsonb",
            input: "json"
        },
        type: {
            type: "integer",
            relation: {
                model: "vehicle_type",
                key: "key"
            },
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
            auth: ["system_admin","rage_mp_post"],
        },
        delete: {
            auth: ["system_admin"],
        },
        schema: {
            auth: ["everybody"],
        }
    }
}