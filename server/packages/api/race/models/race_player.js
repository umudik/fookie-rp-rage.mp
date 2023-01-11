module.exports = async function (ctx) {
    await ctx.model({
        name: 'race_player',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            race: {
                relation: "race",
                required: true,
                uniqueGroup: ["g1"]
            },
            player: {
                relation: "race",
                required: true,
                uniqueGroup: ["g1"]
            },
        },
        lifecycle: {
            create: {
                rule: ["rp_race_is_started"],
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