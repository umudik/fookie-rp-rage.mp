module.exports = {
    name: 'item',
    display: "_id",
    database: "store",
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
            input: "object",
        },
    },
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            modify: ["set_type", "set_inventory_and_type"],
            rule: ["check_weight", "slot_fixer", "openable", "has_slot", "is_slot_avaible", "valid_item_move_body"],
            role: ["admin"],
            effect: ["item_out", "item_in"],
        },
        create: {
            modify: ["set_type", "set_inventory_and_type"],
            rule: ["check_weight", "slot_fixer", "openable", "has_slot", "is_slot_avaible"],
            role: ["admin"],
            effect: ["item_in"],
        },
        delete: {
            modify: ["set_type", "set_inventory_and_type"],
            rule: [],
            role: ["admin"],
            effect: ["item_out"],
        },
    }
}