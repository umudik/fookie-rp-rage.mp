module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "do_item_type_events",
        wait: true,
        function: async function (payload, ctx, state) {
            if (payload.method === "create") {
                const item_type_events = (await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item_type_event",
                    method: "read",
                    query: {
                        filter: {
                            item_type_key: state.item_type[ctx.helpers.pk("item_type")].key
                        }
                    }
                })).data
                for (const ite of item_type_events) {
                    await ite.in(payload.body)
                }

            }

            if (payload.method === "delete") {
                for (const item of state.items) {
                    const item_type_events = (await ctx.run({
                        token: process.env.SYSTEM_TOKEN,
                        model: "item_type_event",
                        method: "read",
                        query: {
                            filter: {

                            }
                        }
                    })).data
                    for (const ite of item_type_events) {
                        await ite.out(item)
                    }
                }

            }

        }
    })
}