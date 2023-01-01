module.exports = async function (ctx) {
    await ctx.model({
        mixins: ["entity", "cache"],
        name: 'marker',
        database: process.env.DATABASE,
        schema: {
            joaat: {
                type: "number",
                required: true,
                default: 1
            },
            color: {
                type: "array",
                required: true,
                default: [0, 123, 123, 255]
            },
            scale: {
                type: "number",
                required: true,
                default: 1
            },
            visible: {
                type: "boolean",
                required: true,
                default: true,
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
            schema: {
                role: ["everybody"],
            },
        }
    })
}



