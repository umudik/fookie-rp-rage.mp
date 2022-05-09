module.exports = async function (ctx) {
    await ctx.use(require("./mixin/entity"))
    await ctx.use(require("./models/entity_type"))
    await ctx.use(require("./effects/rage_mp_entity_sync.js"))
    await ctx.use(require("./modifies/add_entities_to_state"))
    await ctx.use(require("./rule/need_type"))
    await ctx.use(require("./rule/dont_spawn_twice"))
    await ctx.use(require("./modifies/set_type"))

    // SPAWN ALL ENTITIES
    let res = await ctx.run({
        token: true,
        model: "entity_type",
        method: "read"
    })
    entity_types = res.data

    for (let entity_type of entity_types) {
        let res = await ctx.run({
            token: true,
            method: "read",
            model: entity_type.model,

        })

        let allEntites = res.data

        for (let entity of allEntites) {
            ctx.run({
                token: true,
                model: entity_type.model,
                method: "spawn",
                query: {
                    filter: {
                        pk: entity._id
                    }

                }
            })
        }
    }
}



