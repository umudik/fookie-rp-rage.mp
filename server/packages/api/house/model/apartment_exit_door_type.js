module.exports = async function (ctx) {
    await ctx.model({
        name: "apartment_exit_door_type",
        mixin: ["cache"],
        database: "mongodb",
        schema: {
            joaat: {
                type: "string",
                required: true,
                unique: true,
                default: "p_idol_case_s"

            }
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

    let res = await ctx.run({
        token: true,
        model: "apartment_exit_door_type",
        method: "create",
        body: {
            joaat: "p_idol_case_s",
        }
    })
    console.log(res);
}
