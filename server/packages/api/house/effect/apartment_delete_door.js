const { Db } = require("mongodb")

module.exports = async function (ctx) {

    await ctx.lifecycle({
        name: "apartment_delete_door",
        function: async function (payload, ctx, state) {
            for (id of state.computed_ids) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "delete",
                    query: {
                        filter: {
                            parent_id: id,
                            tag: "opening_door"
                        }
                    }

                })
                ctx.run({
                    token: true,
                    model: "object",
                    method: "delete",
                    query: {
                        filter: {
                            parent_id: id,
                            tag: "exit_door"
                        }
                    }
                })
            }
        }
    })
}