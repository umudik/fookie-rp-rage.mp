module.exports = async function (payload) {
    if (payload.body.hasOwnProperty("slot")) {

    } else {
        let avaibleSlots = []
        for (let i in 25) {
            let res = mp.api.run({
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
                avaibleSlots.push(i)
            }
        }

    }
    payload.body.slot = 0
    console.log("item fixer");
}