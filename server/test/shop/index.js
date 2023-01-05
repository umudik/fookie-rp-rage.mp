module.exports = async function (ctx) {
    await ctx.test({
        name: "shop",
        function: async function (state) {
            const shop = await ctx.run({
                token: state.system_token,
                model: "shop",
                method: "create",
                body: {
                    owner: state.user_id,
                    title: "MY Shop",
                }
            })
            console.log(shop);
            if (!shop.status) {
                throw Error("shop")
            }




        }
    })
}