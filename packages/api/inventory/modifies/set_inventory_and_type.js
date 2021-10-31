module.exports = async function (payload) {
    let res1 = await ctx.run({
        system: true,
        method: "get",
        model: "inventory",
        query: {
            where: { _id: payload.target.inventory }
        }
    })
    let inventory = res1.data

    res1 = await ctx.run({
        system: true,
        method: "get",
        model: "inventory_type",
        query: {
            where: { _id: inventory.inventory_type }
        }
    })
    let inventory_type = res1.data

    payload.inventory = inventory
    payload.inventory_type = inventory_type
}