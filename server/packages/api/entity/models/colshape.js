module.exports = async function (ctx) {
    await ctx.model({
        name: 'colshape',
        database: process.env.DATABASE,
        mixin: ["entity", "cache"],
        schema: {
            joaat: {
                type: "number",
                required: true,
            },
            type: {
                type: "string",
                required: true,
                default: "circle"
            },
            radius: {
                type: "number",
                required: true,
                default: 2,
            },
        },
        lifecycle: {
            create: {
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
