module.exports = async function (ctx) {
    await ctx.model({
        name: "shop_transaction",
        database: process.env.DATABASE,
        schema: {
            shop: {
                relation: "shop",
                required: true
            },
            item_type: {
                relation: "item_type",
                required: true
            },
            player: {
                relation: "player",
                required: true
            },
            amount: {
                type: "number",
                required: true
            },
            type: {
                type: "string",
                required: true,
                default: "buy"
            }
        },
        lifecycle: {
            create: {
                rule: ["shop_control"],
                effect: ["pay_amount_and_give_item"],
                role: ["system", "logged_in"],
                accept: {
                    logged_in: ["shop_set_player"]
                }
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
        }
    })
}