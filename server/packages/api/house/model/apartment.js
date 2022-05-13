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
                relation: "apartment",
                required: true,
            },
            fixed_dimension: {
                type: "number",
                required: true,
                unique: true,
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
                effect: ["apartment_bind_effect"]
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
