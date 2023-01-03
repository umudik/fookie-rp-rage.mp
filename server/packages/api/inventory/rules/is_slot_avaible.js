module.exports = async function (ctx) {
    await ctx.lifecycle({
        name: "is_slot_avaible",
        function: async function (payload, ctx, state) {
            if (payload.method === "create") {
                const emptySlots = await ctx.helpers.emptySlots(payload.body.inventory)

                if (emptySlots.length == 0) {
                    return false
                }

                if (payload.body.slot) {
                    if (!ctx.lodash.includes(emptySlots, payload.body.slot)) {
                        payload.body.slot = emptySlots[0]
                    }
                }

                const needed_slot_size = Math.ceil(payload.body.amount / state.item_type.stack)
                return needed_slot_size <= emptySlots.length
            }
            if (payload.method === "update") {
                for (const item of state.items) {
                    const inv_id = payload.body.inventory ? payload.body.inventory : item.inventory
                    const it_id = payload.body.item_type ? payload.body.item_type : item.item_type
                    const slot = payload.body.slot ? payload.body.slot : item.slot
                    const amount = payload.body.amount ? payload.body.amount : item.amount
                    const emptySlots = await ctx.helpers.emptySlots(inv_id)

                    if (item.slot != slot || item.inventory != inv_id) {

                        if (!ctx.lodash.includes(emptySlots, slot)) {
                            return false
                        }
                    }

                    if (item.amount != amount || item.item_type != it_id) {
                        const item_type = (await ctx.run({
                            token: process.env.SYSTEM_TOKEN,
                            model: "item_type",
                            method: "read",
                            query: {
                                filter: {
                                    pk: it_id
                                }
                            }
                        })).data[0]

                        if (Math.ceil(amount / item_type.stack) > emptySlots.length) {
                            return false
                        }
                    }



                }
                return true
            }
            return false
        }


    })
}