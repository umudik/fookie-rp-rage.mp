module.exports = async function (ctx) {
    await ctx.model({
        name: "apartment",
        mixin: ["cache"],
        database: "mongodb",
        schema: {
            name: {
                type: "string",
                required: true,
                unique: true,
            },
            type: {
                relation: "apartment_type",
                required: true,
            },
            fixed_dimension: {
                type: "number",
                required: true,
                unique: true,
            },
            door: {
                relation: "object",
                reactive: [{
                    from: "position",
                    to: "position",
                    compute: v => v
                }],
                reactive_delete: true,
            },
            position: {
                type: "object",
                required: true,
            },
            owner: {
                relation: "user",
            }
        },
        lifecycle: {
            create: {
                role: ["system"],
                effect: ["apartment_create_door"]
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


    await ctx.model({
        name: "apartment_bind",
        mixin: ["cache"],
        database: "mongodb",
        schema: {
            apartment: {
                relation: "apartment",
                required: true,
                unique: true,
            },
            opening_door: {
                relation: "apartment",
                required: true,
            },
            exit_door: {
                relation: "apartment",
                required: true,
            },
        },
        lifecycle: {
            create: {
                role: ["system"],
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
