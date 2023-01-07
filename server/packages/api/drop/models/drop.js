module.exports = async function (ctx) {
    await ctx.model({
        name: 'drop',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            inventory: {
                relation: "inventory",
                required: true
            }
        },
        lifecycle: {
            create: {
                effect: [],
                role: ["system", "logged_in"],
                modify: ["drop_create_inventory"],
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