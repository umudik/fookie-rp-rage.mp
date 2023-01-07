module.exports = async function (ctx) {
    ctx.helpers.currentWeight = async function (inventory_id) {
        let res = await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            method: "read",
            model: "item",
            query: {
                filter: { inventory: inventory_id }
            }
        })

        const items = res.data
        let total = 0

        for (let item of items) {
            const item_type_res = await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                method: "read",
                model: "item_type",
                query: {
                    filter: { pk: item.item_type }
                }
            })

            const item_type = item_type_res.data[0]
            total += item.amount * item_type.weight
        }

        return total
    }

    ctx.helpers.itemsAmount = async function (inventory, item_type) {
        const items = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item",
            method: "read",
            query: {
                filter: {
                    inventory,
                    item_type,
                }
            }
        })).data
        return ctx.lodash.sumBy(items, "amount")
    }

    ctx.helpers.itemsByType = async function (inventory, item_type) {
        const items = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item",
            method: "read",
            query: {
                filter: {
                    inventory,
                    item_type,
                }
            }
        })).data
        return items
    }

    ctx.helpers.removeItems = async function (inventory, item_type, amount) {
        const items = await ctx.helpers.itemsByType(inventory, item_type)
        if (await ctx.helpers.itemsAmount(inventory, item_type) < amount) {
            return false
        }

        for (const item of items) {
            if (amount >= item.amount) {
                await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item",
                    method: "delete",
                    query: {
                        filter: {
                            pk: item[ctx.helpers.pk("item")]
                        }
                    }
                })
                amount = amount - item.amount
            } else {
                await ctx.run({
                    token: process.env.SYSTEM_TOKEN,
                    model: "item",
                    method: "update",
                    query: {
                        filter: {
                            pk: item[ctx.helpers.pk("item")]
                        }
                    },
                    body: {
                        amount: item.amount - amount
                    }
                })
                amount = item.amount - amount
            }

            if (amount <= 0) {
                break
            }
        }
    }

    ctx.helpers.organiseInventory = async function (inventory, it_id) {
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

        const its = await ctx.helpers.itemsByType(inventory, it_id)
        let items = ctx.lodash.sortBy(its, "slot")
        if (items.length === 0) {
            return false
        }

        const total = ctx.lodash.sumBy(items, "amount")



        const amounts = []
        let remain = parseInt(total)

        for (; ;) {
            if (remain > item_type.stack) {
                amounts.push(item_type.stack)

            } else {
                amounts.push(remain)
                break
            }
            remain -= item_type.stack
        }
        if (amounts.length === items.length) {
            return false
        }
        const deleteMe = []
        for (const i in items) {
            deleteMe.push(items[i][ctx.helpers.pk("item")])
        }
        await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "item",
            method: "delete",
            query: {
                filter: {
                    pk: {
                        $or: deleteMe
                    }
                }
            }
        })

        for (const i in amounts) {
            let item = items[0]
            item = ctx.lodash.omit(item, [ctx.helpers.pk("item"), "slot"])
            item.amount = amounts[i]

            await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item",
                method: "create",
                body: item
            })
        }



    }

    ctx.helpers.emptySlots = async function (inventory_id) {
        const inventory = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "inventory",
            method: "read",
            query: {
                filter: {
                    pk: inventory_id
                }
            }
        })).data[0]

        const inventory_type = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "inventory_type",
            method: "read",
            query: {
                filter: {
                    pk: inventory.inventory_type
                }
            }
        })).data[0]

        let items = (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            method: "read",
            model: "item",
            query: {
                filter: {
                    inventory: inventory_id
                }
            }
        })).data

        const na_slots = ctx.lodash.map(items, (item) => item.slot).sort((a, b) => a - b)
        const slots = ctx.lodash.range(0, inventory_type.slotSize)
        const free_slots = ctx.lodash.difference(slots, na_slots)
        return free_slots
    }
}