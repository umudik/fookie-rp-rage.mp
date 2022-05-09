module.exports = async function (ctx) {


    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "engine_on",
            label: "Engine On",
            entity_type: "vehicle",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    method: "update",
                    model: "vehicle",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        ragemp_engine: true,
                    }
                })
            },
        }
    })

    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "engine_off",
            label: "Engine Off",
            entity_type: "vehicle",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    method: "update",
                    model: "vehicle",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        ragemp_engine: false,
                    }
                })
            },
        }
    })
}
