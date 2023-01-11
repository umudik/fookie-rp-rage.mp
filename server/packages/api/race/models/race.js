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
            prepare: {
                type: "boolean",
                required: true,
                default: -1,
            },
            start: {
                type: "number",
                required: true,
                default: -1,
            },
            end: {
                type: "number",
                required: true,
                default: -1,
            },
            owner: {
                relation: "player",
            },
        },
        lifecycle: {
            create: {
                role: ["system", "logged_in"],
                accept: {
                    loggein_in: ["race_set_player"]
                }
            },
            read: {
                role: ["everybody"],
            },
            update: {
                effect: ["race_prepare_effect", "race_start_effect", "race_end_effect"],
                role: ["system", "logged_in"],
                accept: {
                    loggein_in: ["race_set_player"]
                }
            },
            delete: {
                role: ["system"],
            },
        }
    })
}