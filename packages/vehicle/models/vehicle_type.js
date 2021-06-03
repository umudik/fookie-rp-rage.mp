module.exports = {
    name: 'vehicle_type',
    display: "joaat",
    schema: {
        joaat: {
            required: true,
            type: "string",
            input: "text"
        },
        maxFuel: {
            required: true,
            type: "number",
            input: "number",
            default: 100,
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