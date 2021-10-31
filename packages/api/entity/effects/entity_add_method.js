module.exports = async function (ctx) {
    await ctx.effect({
        name: "entity_add_method",
        function: async function (payload, ctx) {

            payload.body.methods.set("spawn", async function (payload) {
                return true
            })

            payload.body.methods.set("despawn", async function (payload) {
                return true
            })
        }
    })
}
