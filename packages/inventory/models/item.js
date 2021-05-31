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
            modify: ["set_type","set_inventory_and_type"],
            rule: ["check_weight", "slot_fixer", "openable", "has_slot", "is_slot_avaible",],
            role: ["system_admin"],
            effect: ["item_out", "item_in"],
        },
        post: {
            modify: ["set_type","set_inventory_and_type"],
            rule: ["check_weight", "slot_fixer", "openable", "has_slot", "is_slot_avaible", ,],
            role: ["system_admin"],
            effect: ["item_in"],
        },
        delete: {
            modify: ["set_type","set_inventory_and_type"],    
            rule: [],
            role: ["system_admin"],
            effect: ["item_out"],
        },
        schema: {
            role: ["everybody"],
        },
        move: {
            filter: [],
            rule: ["valid_item_move_body"],
            role: [],
            effect: [],
        }
    }
}