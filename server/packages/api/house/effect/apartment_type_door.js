module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "apartment_type_door",
        function: async function (payload, ctx, state) {
            if (payload.method == "update") {
                for (let apartment_type of state.computed_data) {
                    const apartments_ = await ctx.remote.all("apartment", {
                        filter: {
                            type: apartment_type[ctx.helpers.pk("apartment_type")]
                        }
                    })
                    for (let apartment of apartments_) {
                        await ctx.run({
                            token: process.env.SYSTEM_TOKEN,
                            model: "object",
                            method: "update",
                            query: {
                                filter: {
                                    parent_id: apartment[ctx.helpers.pk("apartment")],
                                    tag: "exit_door"
                                }
                            },
                            body: {
                                position: apartment_type.location,
                            }
                        })
                    }
                }
            }
            else if (payload.method == "delete") { }
        }
    })
}