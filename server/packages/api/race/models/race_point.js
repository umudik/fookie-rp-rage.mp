module.exports = async function (ctx) {
    await ctx.model({
        name: 'race_point',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            race: {
                relation: "race",
                required: true,
                uniqueGroup: ["g1"],
            },
            race_type_point: {
                relation: "race_type_point",
                required: true,
                uniqueGroup: ["g1"],
            },
            player: {
                type: "number",
                required: true,
                uniqueGroup: ["g1"],
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