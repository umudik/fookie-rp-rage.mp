module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "apartment_type_door",
        function: async function (payload, ctx, state) {
            if (payload.method == "update") {
                for (let apartment_type of state.computed_data) {
                    const apartments_ = await ctx.remote.all("apartment", {
                        filter: {
                            type: apartment_type._id
                        }
                    })
                    for (let apartment of apartments_) {
                        await ctx.run({
                            token: true,
                            model: "object",
                            method: "update",
                            query: {
                                filter: {
                                    parent_id: apartment._id,
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