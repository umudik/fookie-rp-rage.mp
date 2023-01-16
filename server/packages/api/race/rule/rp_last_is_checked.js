const race = require("../models/race")

module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rp_last_is_checked",
        wait: true,
        function: async function (payload, ctx, state) {

            const arr = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "race_type_point",
                method: "read",
                query: {
                    filter: {
                        race_type: race.race_type,
                    }
                }
            })).data

            const points = ctx.lodash.sortBy(arr, "order")

            return true
        }
    })
}