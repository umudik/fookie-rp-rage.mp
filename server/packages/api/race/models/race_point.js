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
                relation: "player",
                required: true,
                uniqueGroup: ["g1"],
            },
            achived: {
                type: "number",
                required: true,
                default: -1
            }
        },
        lifecycle: {
            create: {
                effect: ["rp_is_end"],
                rule: ["rp_last_is_checked"],
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