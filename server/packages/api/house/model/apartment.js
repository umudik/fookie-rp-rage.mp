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
                effect: ["apartment_door"]
            },
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
                filter: ["set_computed_data"],
                effect: ["apartment_door"]
            },
            delete: {
                role: ["system"],
                rule: ["set_computed_data"],
                effect: ["apartment_door"]
            },
        }
    })
}
