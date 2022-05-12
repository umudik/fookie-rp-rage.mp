module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["cache"],
        name: 'marker_type',
        database: "mongodb",
        schema: {
            joaat: {
                type: "number",
                required: true,
                unique: true,
            },
            color: {
                type: "array",
                required: true,
                default: [0, 0, 0, 255]
            }
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["system"],
            },
            create: {
                role: ["system"],
            },
            delete: {
                role: ["system"],
            },
            schema: {
                role: ["everybody"],
            },
        }
    })



    const arr = [
        {
            joaat: 1,
        },
        {
            joaat: 2,
        },
        {
            joaat: 3,
        }
    ]
    for (const et of arr) {
        let res = await ctx.run({
            token: true,
            model: "marker_type",
            method: "create",
            body: et
        })
        console.log(res);
    }
}



