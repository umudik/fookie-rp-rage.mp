module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "rp_is_end",
        wait: true,
        function: async function (payload, ctx, state) {
            // bu rp son mi?
            const last = ctx.lodash.reverse(ctx.lodash.sortBy(await ctx.remote.all("race_type_point"), "order"))[0]

            if (payload.body.race_type_point === last[ctx.helpers.pk("race_type_point")]) {
                console.log("son çizgiyi geçtin");
                setTimeout(async () => {
                    await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        model: "race",
                        method: "update",
                        query: {
                            filter: {
                                pk: payload.body.race,
                                end: -1
                            }
                        },
                        body: {
                            end: Date.now()
                        }
                    })
                }, 10 * 1000);
            }
            // 60 sn içinde yarışı bitir.

        }
    })
}