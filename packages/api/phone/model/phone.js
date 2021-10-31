module.exports = async function (ctx) {
    await ctx.model({
        name: 'phone',
        display: "_id",
        database: "store",
        schema: {
            item: {
                relation: "item",
            },
            bg_image: {
                type: "string",
                input: "text"
            },
            ringtone: {
                type: "string",
                input: "text"
            },
            zoom: {
                type: "number",
                input: "range",
                min: 0,
                max: 100
            }
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

        }
    })
}