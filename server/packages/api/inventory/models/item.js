module.exports = {
    name: 'item',
    database: process.env.DATABASE,
    mixins: [],
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
            min: 0
        },
        amount: {
            required: true,
            type: "number",
            min: 1
        },
        data: {
            type: "object"
        }
    },
    lifecycle: {
        create: {
            modify: ["set_inventory_and_type", "slot_fixer"],
            rule: ["check_weight", "openable", "has_slot", "is_slot_avaible"],
            role: ["system"],
            effect: ["organise_inventory", "do_item_type_events"],
        },
        read: {
            role: ["everybody"],
        },
        update: {
            modify: ["find_items"],
            rule: ["check_weight", "openable", "has_slot", "is_slot_avaible"],
            role: ["system", "logged_in"],
            effect: [],
        },
        delete: {
            modify: ["find_items"],
            rule: [],
            role: ["system"],
            effect: ["do_item_type_events"],
        },
        count: {
            modify: [],
            rule: [],
            role: ["system"],
            effect: [],
        },
    }
}