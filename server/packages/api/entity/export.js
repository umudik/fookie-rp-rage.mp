module.exports = async function (ctx) {
    await ctx.use(require("./mixin/entity"))
    await ctx.use(require("./models/entity_type"))
    await ctx.use(require("./effects/rage_mp_entity_sync.js"))
    await ctx.use(require("./modifies/add_entities_to_state"))
    await ctx.use(require("./rule/need_type"))
    await ctx.use(require("./rule/dont_spawn_twice"))
    await ctx.use(require("./modifies/set_type"))

}



