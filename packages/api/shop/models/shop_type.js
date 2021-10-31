module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_type',
        display: "joaat",
        database: "store",
        schema: {
            joaat: {
                required: true,
                type: "string",
                input: "text"
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