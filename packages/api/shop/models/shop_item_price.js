module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_item_price',
        display: "_id",
        database: "store",
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
                role: ["admin"],
            },
            create: {
                role: ["admin"],
            },
            delete: {
                role: ["admin"],
            },
        }
    })
}