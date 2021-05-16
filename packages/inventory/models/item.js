module.exports = {
    name: 'item',
    display: "id",
    schema: {
        item_type: {
            required: true,
            relation: "item_type",
        },
        inventory: {
            required: true,
            relation: "inventory",
        },
        slot: {
            required: true,
            type: "integer",
            input: "number",
        },
        amount: {
            required: true,
            type: "integer",
            input: "number",
        },
        data: {
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
            rule: ["openable", "check_weight", "has_slot", "is_slot_avaible"],
            role: ["system_admin"],
        },
        post: {
            rule: ["openable", "check_weight", "has_slot", "is_slot_avaible"],
            role: ["system_admin"],
        },
        delete: {
            rule: [],
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        }
    }
}