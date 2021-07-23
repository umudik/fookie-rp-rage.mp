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