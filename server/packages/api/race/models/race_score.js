module.exports = async function (ctx) {
    await ctx.model({
        name: 'race_score',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            race: {
                relation: "race",
                required: true
            },
            player: {
                type: "boolean",
                required: true,
                default: false,
            },
            placement: {
                type: "number",
                required: true,
                default: false,
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
            delete: {
                role: ["everybody"],
            },
        }
    })
}