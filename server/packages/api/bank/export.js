module.exports = async function (ctx) {
    await ctx.model(require("./models/bank_account.js"))

    ctx.helpers.playerBankAccount = async function (player) {
        return (await ctx.run({
            token: process.env.SYSTEM_TOKEN,
            model: "bank_account",
            method: "read",
            query: {
                filter: {
                    player
                }
            }
        })).data[0]
    }

    ctx.helpers.playerBalance = async function (player) {
        const bk = await ctx.helpers.playerBankAccount(player)
        if (bk) {
            const money = (await ctx.run({
                token: process.env.SYSTEM_TOKEN,
                model: "item_type",
                method: "read",
                query: {
                    filter: {
                        name: "money"
                    }
                }
            })).data[0]

            return ctx.helpers.itemsAmount(bk.inventory, money[ctx.helpers.pk("item_type")])
        } else {
            return 0
        }

    }
}