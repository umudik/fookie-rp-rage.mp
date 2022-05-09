module.exports = async function (ctx) {
    await ctx.model({
        name: 'entity_type',
        database: "store",
        schema: {
            name: {
                type: "string",
                unique: true,
                required: true,
            },
            model: {
                required: true,
                unique: true,
                type: "string",
            },
            pool: {
                required: true,
                type: "string",
            },
            data: {
                type: "object",
            },
            spawnAtStart: {
                type: "boolean",
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



    const entityTypes = [
        {
            name: "Vehicle",
            model: "vehicle",
            pool: "vehicles",
            spawnAtStart: true,
            syncInterval: true,
            syncRate: 1000,
        },
        {
            name: "Object",
            model: "object",
            pool: "objects",
            spawnAtStart: true,
            syncInterval: true,
            syncRate: 2000,
        }
    ]

    for (const e of entityTypes) {
        await ctx.run({
            token: true,
            model: "entity_type",
            method: "create",
            body: e
        })
    }
}