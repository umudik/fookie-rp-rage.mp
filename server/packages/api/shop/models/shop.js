module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            title: {
                type: "string",
                required: true
            },
            inventory: {
                relation: "inventory"
            },
            available_bank: {
                type: "boolean",
                required: true,
                default: true
            },
            owner: {
                relation: "player",
                required: true,
            },
        },
        lifecycle: {
            create: {
                rule: ["shop_control_count"],
                effect: ["shop_create_inventory"],
                role: ["system"],
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
        }
    })
}