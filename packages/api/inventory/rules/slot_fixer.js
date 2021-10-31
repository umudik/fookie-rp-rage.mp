module.exports = async function (payload) {
    let res = await ctx.run({
        system: true,
        method: "get",
        model: "item",
        query: {
            where: {
                inventory: payload.target.inventory,
                item_type: payload.target.ite
            }
        }
    })
    if (res.status == 200) {
        let item = res.data
        payload.body.slot = item.slot
        return true
    } else {
        if (payload.body.hasOwnProperty("slot")) {


        } else {
            let avaibleSlots = []
            for (let i in payload.inventory_type.slotSize) {
                let res = await ctx.run({
                    system: true,
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
                    avaibleSlots.push(i)
                }
            }
            if (avaibleSlots.length > 0) {
                payload.body.slot = avaibleSlots[0]
                return true
            } else {
                return false
            }
        }
    }






    console.log("item fixer");
}