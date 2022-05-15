module.exports = async function (ctx) {
    await ctx.use(require("./model/apartment.js"))
    await ctx.use(require("./model/apartment_type.js"))
    await ctx.use(require("./effect/apartment_create_door.js"))
    await ctx.use(require("./effect/apartment_delete_door.js"))

}


mp.events.add("fookie_connected", async (ctx) => {
    await ctx.use(require("./menus/index.js"))
})