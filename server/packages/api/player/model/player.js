module.exports = async function (ctx) {
  const res = await ctx.model({
    name: "player",
    database: process.env.DATABASE,
    mixins: ["entity"],
    schema: {
      name: {
        type: "string",

      },
      email: {
        type: "string",
        required: true,
        unique: true,
      },
      password: {
        type: "string",
        required: true,
        read: ["nobody"]
      },
      code: {
        type: "string",
      },
      hunger: {
        type: "number",

      },
      thirst: {
        type: "number",

      },
      health: {
        type: "number",
        default: 100,
        required: true
      },
      cloth_head: { type: "object" },
      cloth_beard: { type: "object" },
      cloth_hair: { type: "object" },
      cloth_torso: { type: "object" },
      cloth_legs: { type: "object" },
      cloth_hand: { type: "object" },
      cloth_foot: { type: "object" },
      cloth_eye: { type: "object" },
      cloth_accessory1: { type: "object" },
      cloth_accessory2: { type: "object" },
      cloth_decal: { type: "object" },
      cloth_auxiliary: { type: "object" },
      customization_gender: { type: "boolean" },
      customization_mother_blend: { type: "number" },
      customization_father_blend: { type: "number" },
      customization_f_blend_shape: { type: "number" },
      customization_f_blend_skin: { type: "number" },
      customization_hair_highlight: { type: "number" },
      customization_hair_color: { type: "number" },
      customization_nose_width: { type: "number" },
      customization_nose_height: { type: "number" },
      customization_nose_length: { type: "number" },
      customization_nose_bridge: { type: "number" },
      customization_nose_tip: { type: "number" },
      customization_nose_bridge_shift: { type: "number" },
      customization_brow_height: { type: "number" },
      customization_brow_width: { type: "number" },
      customization_c_bone_height: { type: "number" },
      customization_c_bone_width: { type: "number" },
      customization_cheek_width: { type: "number" },
      customization_eyes: { type: "number" },
      customization_lips: { type: "number" },
      customization_jaw_width: { type: "number" },
      customization_jaw_height: { type: "number" },
      customization_chin_length: { type: "number" },
      customization_chin_pos: { type: "number" },
      customization_chin_width: { type: "number" },
      customization_chin_shape: { type: "number" },
      customization_neck_width: { type: "number" },
      inventory: {
        relation: "inventory",
      }
    },
    lifecycle: {
      read: {
        role: [],
      },
      update: {
        role: ["system"],
        modify: ["hash_password"],
      },
      create: {
        rule: [],
        role: ["system"],
        modify: ["hash_password", "set_spawn_point"],
        effect: ["player_create_inventory"]
      },
      delete: {
        role: ["system"],
      },
      count: {
        role: ["system"],
      },
      login: {
        preRule: ["has_password_email"],
      }
    },
  });
};
