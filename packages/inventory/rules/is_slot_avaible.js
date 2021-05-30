module.exports = async function (payload) {
    let res = await mp.api.run({
        user: { system: true },
        method: "count",
        model: "item",
        query: {
            where: {
                inventory: payload.target.inventory,
                slot: payload.target.slot
            }
        }
    })
    if (res.data == 0) {
        return true
    } else {
        for (let i in payload.type.stack_size)
            res = await mp.api.run({
                user: { system: true },
                method: "count",
                model: "item",
                query: {
                    where: {
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