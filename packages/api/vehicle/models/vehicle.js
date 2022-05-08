module.exports = async function (ctx) {
    await ctx.model({
        mixin: ["entity"],
        name: 'vehicle',
        database: "store",
        schema: {
            vehicle_type: { required: true, relation: "vehicle_type", },
            owner: { relation: "character" },
            inventory: { relation: "inventory" },
            mod_spoiler: { type: "number", input: "number", default: -1 },
            mod_front_bumper: { type: "number", input: "number", default: -1 },
            mod_rear_bumper: { type: "number", input: "number", default: -1 },
            mod_side_skirt: { type: "number", input: "number", default: -1 },
            mod_exhaust: { type: "number", input: "number", default: -1 },
            mod_frame: { type: "number", input: "number", default: -1 },
            mod_grille: { type: "number", input: "number", default: -1 },
            mod_hood: { type: "number", input: "number", default: -1 },
            mod_fender: { type: "number", input: "number", default: -1 },
            mod_right_fender: { type: "number", input: "number", default: -1 },
            mod_roof: { type: "number", input: "number", default: -1 },
            mod_engine: { type: "number", input: "number", default: -1 },
            mod_brake: { type: "number", input: "number", default: -1 },
            mod_transmission: { type: "number", input: "number", default: -1 },
            mod_horn: { type: "number", input: "number", default: -1 },
            mod_suspension: { type: "number", input: "number", default: -1 },
            mod_armor: { type: "number", input: "number", default: -1 },
            mod_turbo: { type: "number", input: "number", default: -1 },
            mod_xenon: { type: "number", input: "number", default: -1 },
            mod_front_wheels: { type: "number", input: "number", default: -1 },
            mod_back_wheels: { type: "number", input: "number", default: -1 },
            mod_plate_holder: { type: "number", input: "number", default: -1 },
            mod_vanity_plate: { type: "number", input: "number", default: -1 },
            mod_trim_design: { type: "number", input: "number", default: -1 },
            mod_ornament: { type: "number", input: "number", default: -1 },
            mod_dial_design: { type: "number", input: "number", default: -1 },
            mod_steering_wheel: { type: "number", input: "number", default: -1 },
            mod_shift_lever: { type: "number", input: "number", default: -1 },
            mod_plaques: { type: "number", input: "number", default: -1 },
            mod_speakers: { type: "number", input: "number", default: -1 },
            mod_trunk: { type: "number", input: "number", default: -1 },
            mod_hydraulic: { type: "number", input: "number", default: -1 },
            mod_engine_block: { type: "number", input: "number", default: -1 },
            mod_boost: { type: "number", input: "number", default: -1 },
            mod_struts: { type: "number", input: "number", default: -1 },
            mod_arch_cover: { type: "number", input: "number", default: -1 },
            mod_aerial: { type: "number", input: "number", default: -1 },
            mod_trim: { type: "number", input: "number", default: -1 },
            mod_tank: { type: "number", input: "number", default: -1 },
            mod_windows: { type: "number", input: "number", default: -1 },
            mod_unknown: { type: "number", input: "number", default: -1 },
            mod_livery: { type: "number", input: "number", default: -1 },
            mod_plate: { type: "number", input: "number", default: -1 },
            mod_window_tint: { type: "number", input: "number", default: -1 },
            color1: { type: "object", input: "object", default: [255, 255, 255] },
            color2: { type: "object", input: "object", default: [255, 255, 255] },
            locked: { type: "boolean", input: "boolean", default: false },
            alarm: { type: "boolean", input: "boolean", default: false },
            ragemp_engine: { type: "boolean", input: "boolean", default: false },
            ragemp_fuel: { type: "number", input: "number", default: 100 },
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



