module.exports = async function (payload) {

    let amount = payload.body.amount
    let slot = payload.body.slot
    let other = payload.body.other

    let postable = ctx.run({
        token: true,
        model: "item",
        method: "test",
        options: {
            method: "create"
        },
        body: {
            item_type: payload.target.item_type,
            data: payload.target.data,
            inventory: other,
            slot: slot,
            amount
        }
    })


    let deletable = ctx.run({
        token: true,
        model: "item",
        method: "test",
        options: {
            method: "update"
        },
        body: {
            inventory: payload.target.inventory,
            slot: payload.target.slot,
            amount: payload.target.amount - amount
        }
    })

    if (postable.data && deletable.data) {
        ctx.run({
            token: true,
            model: "item",
            method: "create",
            body: {
                item_type: payload.target.item_type,
                data: payload.target.data,
                inventory: other,
                slot: slot,
                amount
            }
        })
        ctx.run({
            token: true,
            model: "item",
            method: "update",
            body: {
                inventory: payload.target.inventory,
                slot: payload.target.slot,
                amount: payload.target.amount - amount
            }
        })


    }
}