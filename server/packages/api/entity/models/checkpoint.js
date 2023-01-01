module.exports = async function (ctx) {
    await ctx.model({
        name: 'checkpoint',
        database: process.env.DATABASE,
        mixin: ["entity", "cache"],
        schema: {
            joaat: {
                type: "number",
                required: true,
            },
            radius: {
                type: "number",
                required: true,
                default: 2,
            },
            color: {
                type: "array",
                default: [252, 253, 254, 255],
            },
            visible: {
                type: "boolean",
                required: true,
                default: true,
            }
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
