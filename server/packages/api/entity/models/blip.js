module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity", "cache"],
        name: 'blip',
        database: process.env.DATABASE,
        schema: {
            joaat: {
                type: "number",
                required: true,
                default: 66
            },
            name: {
                type: "string",
                required: true,
                default: "blip" + Math.round(Math.random() * 999999)
            },
            color: {
                type: "number",
                required: true,
                default: 1
            },
            scale: {
                type: "number",
                required: true,
                default: 1
            },
            draw_distance: {
                type: "number",
                default: 12
            },
            shortRange: {
                type: "boolean",
                required: true,
                default: false
            },
            radius: {
                type: "number",
                required: true,
                default: 12
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



