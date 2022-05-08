module.exports = async function (payload) {
    let res = await ctx.run({
        token: true,
        method: "read",
        model: "item",
        query: {
            where: { inventory: payload.target.inventory }
        }
    })

    let items = res.data
    let total = 0

    for (let item of items) {
        res = await ctx.run({
            token: true,
            method: "get",
            model: "item_type",
            query: {
                where: { _id: item.item_type }
            }
        })

        let item_type = res.data
        total += item.amount * item_type.weight
    }

    res = await ctx.run({
        token: true,
        method: "get",
        model: "item_type",
        query: {
            where: { _id: payload.target.item_type }
        }
    })

    let self_type = res.data

    total += payload.target.amount * self_type.weight


    res = await ctx.run({
        token: true,
        method: "get",
        model: "inventory",
        query: {
            where: { _id: payload.target.inventory }
        }
    })

    let inventory = res.data

    res = await ctx.run({
        token: true,
        method: "get",
        model: "inventory_type",
        query: {
            where: { _id: inventory.inventory_type }
        }
    })
    let inventory_type = res.data
    return inventory_type.maxWeight >= total
}