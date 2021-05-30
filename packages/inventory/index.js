mp.events.add("fookie_connected", async () => {
    mp.api.model(require("../inventory/models/inventory"))
    mp.api.model(require("../inventory/models/inventory_type"))
    mp.api.model(require("../inventory/models/item_type"))
    mp.api.model(require("../inventory/models/item"))
    mp.api.rule("has_slot", require("../inventory/rules/has_slot.js"))
    mp.api.rule("check_weight", require("../inventory/rules/check_weight.js"))
    mp.api.rule("openable", require("../inventory/rules/openable.js"))
    mp.api.rule("is_slot_avaible", require("../inventory/rules/is_slot_avaible.js"))
    mp.api.effect("item_in", require('../inventory/effects/item_in'))
    mp.api.effect("item_out", require('../inventory/effects/item_out'))



    mp.api.rule("valid_item_move_body", async function (payload) {

        let amount = payload.body.amount
        let slot = payload.body.slot
        let other = payload.body.other

        let postable = mp.api.run({
            user: { system: true },
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
            user: { system: true },
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
                user: { system: true },
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
                user: { system: true },
                model: "item",
                method: "patch",
                body: {
                    inventory: payload.target.inventory,
                    slot: payload.target.slot,
                    amount: payload.target.amount - amount
                }
            })


        }
    })
    mp.api.effect("item_amount_fixer", async function (payload) {
        if (payload.target.amount == 0) {
            mp.api.run({
                user: { system: true },
                method: "delete",
                model: "item",
                query: {
                    where: {
                        _id:payload.target._id
                    }
                }
            })
        }

        console.log("item fixer");
    })
    let item_model = mp.api.models.get("item")
    item_model.methods.set("move", (payload) => {

    })
})



