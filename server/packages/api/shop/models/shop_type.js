module.exports = async function (ctx) {
    await ctx.model({
        name: 'shop_type',
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