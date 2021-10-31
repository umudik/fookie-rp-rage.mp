module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop',
        display: "_id",
        database: "store",
        mixin: ["entity"],
        schema: {
            inventory: {
                required: true,
                relation: "inventory"
            },
            owner: {
                relation: "character"
            },
            shop_type: {
                required: true,
                relation: "shop_type",
            },
            open: {
                type: "boolean",
                input: "boolean"
            },
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