module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_item_type_price',
        database: process.env.DATABASE,
        schema: {
            shop: {
                relation: "shop",
                required: true,
                uniqueGroup: ["g1"],
            },
            item_type: {
                required: true,
                relation: "item_type",
                uniqueGroup: ["g1"],
            },
            price: {
                required: true,
                type: "number",
            },
            type: {
                type: "string",
                required: true,
                default: "buy",
                uniqueGroup: ["g1"],
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