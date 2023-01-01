

module.exports = async function (ctx) {
    await ctx.model({
        name: 'craft',
        database: process.env.DATABASE,
        schema: {
            craft_type: {
                relation: "craft_type",
                required: true,
            },
            inventory: {
                relation: "inventory",
                required: true,
            }
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            create: {
                modify: ["craft_sets"],
                rule: ["has_items", "control_slot", "control_weight"],
                role: ["system"],
                effect: ["craft_items"]
            },
            delete: {
                role: ["system"],
            },
            count: {
                role: ["system"],
            },

        }
    })
}
