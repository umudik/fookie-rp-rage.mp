module.exports = async function (ctx) {
    await ctx.modify({
        name: "set_type",
        function: async function (payload) {
            let _id = payload.target[payload.model + "_type"]
            let res = await ctx.run({
                system: true,
                model: payload.model + "_type",
                method: "get",
                query: { where: { _id } }
            })
            payload.type = res.data
        }
    })
}