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
            relation: "inventory"
        },
        position: {
            type: "jsonb",
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