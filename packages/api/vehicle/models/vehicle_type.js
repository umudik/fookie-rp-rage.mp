module.exports = async function (ctx) {
    await ctx.model({
        name: 'vehicle_type',
        display: "joaat",
        database: "store",
        schema: {
            joaat: {
                required: true,
                type: "string",
                input: "text"
            },
            maxFuel: {
                required: true,
                type: "number",
                input: "number",
                default: 100,
            },
        },
        lifecycle: {
            read: {
                role: ["everybody"],
            },
            update: {
                role: ["admin"],
            },
            create: {
                role: ["admin"],
            },
            delete: {
                role: ["admin"],
            },
            schema: {
                role: ["everybody"],
            }
        }
    })
}
