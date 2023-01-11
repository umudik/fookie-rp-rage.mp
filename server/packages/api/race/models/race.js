module.exports = async function (ctx) {
    await ctx.model({
        name: 'race',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            race_type: {
                relation: "race_type",
                required: true
            },
            started: {
                type: "boolean",
                required: true,
                default: false,
            },
            ended: {
                type: "boolean",
                required: true,
                default: false,
            },
            winner: {
                relation: "player",
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