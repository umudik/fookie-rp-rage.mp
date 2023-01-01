module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "dont_spawn_twice",
        function: async function (payload, ctx, state) {
            if (payload.model == "player") return true
            const e_res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: payload.model,
                method: "read",
                query: payload.query
            })
            const entities = e_res.data
            for (const entity of entities) {
                if (ctx.lodash.has(payload.body, "spawned") && payload.body.spawned) {
                    if (entity.spawned === payload.body.spawned) {
                        return false
                    }
                }
            }
        }
    })
}