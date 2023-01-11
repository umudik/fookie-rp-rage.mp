const race = require("../models/race")

module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rp_race_is_started",
        wait: true,
        function: async function (payload, ctx, state) {

            state.race = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "race",
                method: "read",
                query: {
                    filter: {
                        pk: payload.body.race
                    }
                }
            })).data[0]
            if (state.race.start < 0) {
                return false
            }

            return true
        }
    })
}