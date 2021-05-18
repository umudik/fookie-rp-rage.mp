module.exports = async function (payload) {
    let item = payload.target
    let res = await mp.api.run({
        user: { system: true },
        method: "count",
        model: "item",
        query: {
            where: {
                inventory: item.inventory,
                slot: item.slot
            }
        }
    })
    return res.data == 0 ? true : false
}