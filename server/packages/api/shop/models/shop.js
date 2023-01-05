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
            owner: {
                relation: "player",
                required: true,
            },
        },
        lifecycle: {
            create: {
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