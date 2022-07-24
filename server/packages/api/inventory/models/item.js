module.exports = {
    name: 'item',
    database: "mongodb",
    mixin: ["cache"],
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
        },
        amount: {
            required: true,
            type: "number",
        },
    },
    lifecycle: {
        read: {
            role: ["everybody"],
        },
        update: {
            modify: [],
            rule: [],
            role: ["system"],
            effect: ["item_out", "item_in"],
        },
        create: {
            modify: ["set_inventory_and_type", "slot_fixer"],
            rule: ["check_weight", "openable", "has_slot", "is_slot_avaible"],
            role: ["system"],
            effect: ["item_in"],
        },
        delete: {
            modify: [],
            rule: [],
            role: ["system"],
            effect: ["item_out"],
        },
    }
}