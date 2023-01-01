module.exports = async function (ctx) {
    await ctx.model({
        name: 'label',
        database: process.env.DATABASE,
        mixin: ["entity", "cache"],
        schema: {
            text: {
                type: "string",
                required: true,
                default: "LABEL"
            },
            los: {
                type: "boolean",
                required: true,
                default: true
            },
            font: {
                type: "number",
                required: true,
                default: 0
            },
            drawDistance: {
                type: "number",
                required: true,
                default: 1
            },
            color: {
                type: "array",
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
