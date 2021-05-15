module.exports = {
    name: 'vehicle_type',
    display: "joaat",
    schema: {
        joaat: {
            type: "string",
            input: "text"
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