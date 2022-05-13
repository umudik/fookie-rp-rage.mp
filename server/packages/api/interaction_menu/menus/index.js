module.exports = async function (ctx) {

    //-----------------VEHİCLE---------------------
    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "engine_on",
            label: "Engine On",
            tag: "vehicle",
            close_on_click: true,
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
            tag: "vehicle",
            close_on_click: true,
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

    //-----------------OBJECT---------------------
    await ctx.run({
        token: true,
        model: "interaction_menu",
        method: "create",
        body: {
            name: "object_z--",
            label: "z--",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x,
                            y: entity.position.y,
                            z: entity.position.z - 0.1
                        }
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
            name: "object_z++",
            label: "z++",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x,
                            y: entity.position.y,
                            z: entity.position.z + 0.1
                        }
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
            name: "object_x--",
            label: "x--",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x - 0.1,
                            y: entity.position.y,
                            z: entity.position.z
                        }
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
            name: "object_x++",
            label: "x++",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x + 0.1,
                            y: entity.position.y,
                            z: entity.position.z,
                        }
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
            name: "object_y--",
            label: "y--",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x,
                            y: entity.position.y - 0.1,
                            z: entity.position.z
                        }
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
            name: "object_y++",
            label: "y++",
            tag: "object",
            control: async function (character, entity, payload) {
                return true //todo
            },
            job: async function (character, entity, payload) {
                ctx.run({
                    token: true,
                    model: "object",
                    method: "update",
                    query: {
                        filter: {
                            pk: payload.fookie_id
                        }
                    },
                    body: {
                        position: {
                            x: entity.position.x,
                            y: entity.position.y + 0.1,
                            z: entity.position.z
                        }
                    }
                })
            },
        }
    })
}
