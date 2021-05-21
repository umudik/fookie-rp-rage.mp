module.exports = async function (payload) {
    if (payload.method == "post") {
        payload.ctx.run({
            user: { system: true },
            method: "spawn",
            model: "entity",
            query: { where: { id: payload.response.data._id } }
        })
    }
}