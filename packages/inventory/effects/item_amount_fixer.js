module.exports = async function (payload) {
    if (payload.target.amount == 0) {
        mp.api.run({
            user: { system: true },
            method: "delete",
            model: "item",
            query: {
                where: {
                    _id: payload.target._id
                }
            }
        })
    } else if (payload.target.amount > payload.type.stack_size) {
        mp.api.run({
            user: { system: true },
            method: "patch",
            model: "item",
            query: {
                where: {
                    _id: payload.target._id
                }
            },
            body: {
                amount: payload.type.stack_size
            }
        })

        mp.api.run({
            user: { system: true },
            method: "post",
            model: "item",
            body: {
                item_type: payload.target.item_type,
                inventory: payload.target.inventory,
                amount: (payload.target.amount - payload.type.stack_size),
                data: payload.target.data
            }
        })
    } else {
        res = mp.api.run({
            user: { system: true },
            method: "get",
            model: "item",
            query: {
                inventory: payload.target.inventory,
                amount: {
                    $lte: (payload.target.amount + payload.body.stack_size),
                }
            }
        })
        console.log("ok");
    }

    console.log("item fixer");
}