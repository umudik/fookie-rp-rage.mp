module.exports = {
    name: 'vehicle',
    display: "id",
    schema: {
        vehicle_type: {
            required: true,
            relation: "vehicle_type",
        },
        owner: {
            relation: "character"
        },
        inventory: {
            relation: "inventory"
        },
        dimension: {
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
        },
        spawn: {
            rule: [],
            role: [],
            effect: [],
            modify: [],
            filter: [],
        },
    }
}