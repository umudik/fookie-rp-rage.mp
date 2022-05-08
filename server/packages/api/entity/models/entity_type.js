module.exports = async function (ctx) {
    await ctx.model({
        name: 'entity_type',
        database: "store",
        schema: {
            name: {
                type: "string",
                input: "text"
            },
            model: {
                required: true,
                type: "string",
                input: "text"
            },
            pool: {
                required: true,
                type: "string",
                input: "text"
            },
            data: {
                type: "object",
                input: "object"
            },
            spawnAtStart: {
                type: "boolean",
                input: "boolean"
            },
            syncInterval: {
                type: "boolean",
                input: "boolean"
            },
            syncRate: {
                type: "number",
                input: "number"
            },
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
}