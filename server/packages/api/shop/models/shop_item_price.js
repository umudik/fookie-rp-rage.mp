module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_item_price',
        database: process.env.DATABASE,
        schema: {
            price: {
                required: true,
                type: "number",
                input: "number"
            },
            item: {
                required: true,
                relation: "item"
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
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
        }
    })
}