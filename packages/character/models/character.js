module.exports = {
    mixin:["entity"],
    name: 'character',
    display: "name",
    schema: {
        name: {
            type: "string",
            input: "text"
        },
        system_user: {
            relation: "system_user"
        },
        inventory: {
            relation: "inventory"
        },
        hunger: {
            type: "number",
            input: "number"
        },
        thirst: {
            type: "number",
            input: "number"
        },
        customization_gender: { type: "number", input: "number" },
        customization_mother_blend: { type: "number", input: "number" },
        customization_father_blend: { type: "number", input: "number" },
        customization_f_blend_shape: { type: "number", input: "number" },
        customization_f_blend_skin: { type: "number", input: "number" },
        customization_hair_highlight: { type: "number", input: "number" },
        customization_hair_color: { type: "number", input: "number" },
        customization_nose_width: { type: "number", input: "number" },
        customization_nose_height: { type: "number", input: "number" },
        customization_nose_length: { type: "number", input: "number" },
        customization_nose_bridge: { type: "number", input: "number" },
        customization_nose_tip: { type: "number", input: "number" },
        customization_nose_bridge_shift: { type: "number", input: "number" },
        customization_brow_height: { type: "number", input: "number" },
        customization_brow_width: { type: "number", input: "number" },
        customization_c_bone_height: { type: "number", input: "number" },
        customization_c_bone_width: { type: "number", input: "number" },
        customization_cheek_width: { type: "number", input: "number" },
        customization_eyes: { type: "number", input: "number" },
        customization_lips: { type: "number", input: "number" },
        customization_jaw_width: { type: "number", input: "number" },
        customization_jaw_height: { type: "number", input: "number" },
        customization_chin_length: { type: "number", input: "number" },
        customization_chin_pos: { type: "number", input: "number" },
        customization_chin_width: { type: "number", input: "number" },
        customization_chin_shape: { type: "number", input: "number" },
        customization_neck_width: { type: "number", input: "number" },
    },
    fookie: {
        get: {
            role: ["everybody"],
        },
        getAll: {
            role: ["everybody"],
        },
        patch: {
            role: ["system_admin"],
        },
        post: {
            role: ["system_admin"],
        },
        delete: {
            role: ["system_admin"],
        },
        schema: {
            role: ["everybody"],
        },
    }
}