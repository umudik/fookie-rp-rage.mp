module.exports = async function (payload) {
    if (payload.method == "post") {
        console.log(1);
        payload.ctx.run({
            user: { system: true },
            method: "spawn",
            model: "entity",
            query: { where: { id: payload.response.data.id } }
        })
    }
}