module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_item_type_price',
        database: process.env.DATABASE,
        schema: {
            shop: {
                required: true,
                relation: "shop"
            },
            item_type: {
                required: true,
                relation: "item_type"
            },
            price: {
                required: true,
                type: "number",
            },

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