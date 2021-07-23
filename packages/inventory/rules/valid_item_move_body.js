module.exports = async function (payload) {

    let amount = payload.body.amount
    let slot = payload.body.slot
    let other = payload.body.other

    let postable = mp.api.run({
        system: true ,
        model: "item",
        method: "test",
        options: {
            method: "post"
        },
        body: {
            item_type: payload.target.item_type,
            data: payload.target.data,
            inventory: other,
            slot: slot,
            amount
        }
    })


    let deletable = mp.api.run({
        system: true ,
        model: "item",
        method: "test",
        options: {
            method: "patch"
        },
        body: {
            inventory: payload.target.inventory,
            slot: payload.target.slot,
            amount: payload.target.amount - amount
        }
    })

    if (postable.data && deletable.data) {
        mp.api.run({
            system: true ,
            model: "item",
            method: "post",
            body: {
                item_type: payload.target.item_type,
                data: payload.target.data,
                inventory: other,
                slot: slot,
                amount
            }
        })
        mp.api.run({
            system: true ,
            model: "item",
            method: "patch",
            body: {
                inventory: payload.target.inventory,
                slot: payload.target.slot,
                amount: payload.target.amount - amount
            }
        })


    }
}