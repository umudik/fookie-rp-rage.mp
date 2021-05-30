module.exports = {
    name: 'item',
    display: "_id",
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
            type: "number",
            input: "number",
        },
        amount: {
            required: true,
            type: "number",
            input: "number",
        },
        data: {
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
            modify: [],
            rule: ["openable", "has_slot", "is_slot_avaible", "check_weight"],
            role: ["system_admin"],
            effect: ["item_amount_fixer", "item_out", "item_in"],
        },
        post: {
            modify: [],
            rule: ["openable", "has_slot", "is_slot_avaible", "check_weight"],
            role: ["system_admin"],
            effect: ["item_amount_fixer", "item_in"],
        },
        delete: {
            modify: [],
            rule: [],
            role: ["system_admin"],
            effect: ["item_out"],
        },
        schema: {
            role: ["everybody"],
        },
        move: {
            modify: [],
            filter: [],
            rule: ["valid_item_move_body"],
            role: [],
            effect: [],
        }
    }
}