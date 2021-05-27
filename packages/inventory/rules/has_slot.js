module.exports = async function (payload) {

    let item = payload.target
    let res = await mp.api.run({
        user: { system: true },
        method: "get",
        model: "inventory",
        query: {
            where: { _id: item.inventory }
        }
    })
    let inventory = res.data

    res = await mp.api.run({
        user: { system: true },
        method: "get",
        model: "inventory_type",
        query: {
            where: { _id: inventory.inventory_type }
        }
    })
    let inventory_type = res.data
    return inventory_type.slotSize > item.slot
}