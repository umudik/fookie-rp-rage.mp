module.exports = async function (ctx) {
    await ctx.model({
        name: 'drop',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            inventory: {
                relation: "inventory",
            }
        },
        lifecycle: {
            create: {
                role: ["system", "logged_in"],
                effect: ["drop_create_inventory"],
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