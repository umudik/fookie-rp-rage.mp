module.exports = async function (ctx) {
    await ctx.model({
        name: 'entity_type',
        database: "store",
        schema: {
            model: {
                required: true,
                unique: true,
                type: "string",
            },
            pool: {
                required: true,
                type: "string",
            },
            ignored_properties: {
                type: "array",
                required: true,
                default: []
            },
            spawnAtStart: {
                type: "boolean",
                required: true,
                default: true
            },
            syncRate: {
                type: "number",
            },
            creator: {
                type: "function",
                required: true,
            },
            destroyer: {
                type: "function",
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
            model: "vehicle",
            pool: "vehicles",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                return mp[state.entity_type.pool].new(mp.joaat(entity.joaat), entity.position)
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "object",
            pool: "objects",
            spawnAtStart: true,
            syncRate: 2000,
            creator: function (entity, state) {
                return mp[state.entity_type.pool].new(mp.joaat(entity.joaat), entity.position)
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "marker",
            pool: "markers",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                return mp[state.entity_type.pool].new(entity.joaat, entity.position, entity.scale)
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "blip",
            pool: "blips",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                return mp[state.entity_type.pool].new(entity.joaat, entity.position, {
                    scale: entity.scale,
                    color: entity.color,
                    drawDistance: entity.drawDistance,
                    shortRange: entity.shortRange,
                    radius: entity.radius,
                });
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "colshape",
            pool: "colshapes",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                if (entity.type == "circle") {
                    return mp.colshapes.newCircle(entity.position.x, entity.position.y, entity.radius, entity.dimension)
                } else if (entity.type == "sphere") {
                    return mp.colshapes.newSphere(entity.position.x, entity.position.y, entity.position.z, entity.radius, entity.dimension)
                } else {
                    throw Error("INVALID COLSHAPE TYPE")
                }
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "label",
            pool: "labels",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                return mp.labels.new(entity.text, entity.position,
                    {
                        los: entity.los,
                        font: entity.font,
                        drawDistance: entity.drawDistance,
                        color: entity.color,
                        dimension: entity.dimension
                    });
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "checkpoint",
            pool: "checkpoints",
            spawnAtStart: true,
            syncRate: 1000,
            creator: function (entity, state) {
                return mp[state.entity_type.pool].new(entity.joaat, entity.position, entity.radius);
            },
            destroyer: function (rage_entity, state) {
                rage_entity.destroy();
            },
        },
        {
            model: "player",
            pool: "players",
            spawnAtStart: false,
            syncRate: 1000,
            creator: function (entity, state) {
                return state.player
            },
            destroyer: function (rage_entity, state) {
                rage_entity.kick();
            },
        },


    ]

    for (const e of entityTypes) {
        let res = await ctx.run({
            token: true,
            model: "entity_type",
            method: "create",
            body: e
        })
    }
}