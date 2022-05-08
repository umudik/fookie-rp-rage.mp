module.exports = async function (payload) {
    let res = await ctx.run({
        token: true,
        method: "count",
        model: "item",
        query: {
            filter: {
                inventory: payload.target.inventory,
                slot: payload.target.slot,
                item_type: payload.target.item_type,
            }
        }
    })
    if (res.data == 0) {
        return true
    } else {
        for (let i in payload.type.stack_size)
            res = await ctx.run({
                token: true,
                method: "count",
                model: "item",
                query: {
                    filter: {
                        inventory: payload.target.inventory,
                        slot: i
                    }
                }
            })
        if (res.data == 0) {
            payload.target.slot = i
            return true
        } else {
            return false
        }
    }
}