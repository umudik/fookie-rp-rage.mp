module.exports = async function (ctx) {
    await ctx.model({
        name: 'bill',
        database: process.env.DATABASE,
        mixins: [],
        schema: {
            description: {
                type: "string",
                required: true
            },
            player: {
                relation: "player",
                required: true
            },
            amount: {
                type: "number",
                required: true,
                default: true
            },
            paid: {
                type: "boolean",
                required: true,
                default: false
            },
            created_at: {
                type: "number",
                required: true,
                default: true
            },
            deadline: {
                type: "number",
                required: true,
                default: true
            },
        },
        lifecycle: {
            create: {
                rule: [],
                effect: [],
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