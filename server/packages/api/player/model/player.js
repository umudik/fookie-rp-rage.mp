module.exports = async function (ctx) {
  await ctx.model({
    name: "player",
    database: "mongodb",
    mixin: ["cache", "entity"],
    schema: {
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
      name: {
        type: "string",

      },
      inventory: {
        relation: "inventory"
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
      cloth_head: { type: "number" },
      cloth_beard: { type: "number" },
      cloth_hair: { type: "number" },
      cloth_torso: { type: "number" },
      cloth_legs: { type: "number" },
      cloth_hand: { type: "number" },
      cloth_foot: { type: "number" },
      cloth_eye: { type: "number" },
      cloth_accessory1: { type: "number" },
      acloth_accessory2: { type: "number" },
      cloth_decal: { type: "number" },
      cloth_auxiliary: { type: "number" },
      customization_gender: { type: "number" },
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
    },
    lifecycle: {
      read: {
        role: ["system"],
      },
      update: {
        role: ["system"],
        modify: ["hash_password"],
      },
      create: {
        rule: [],
        role: ["system"],
        modify: ["hash_password", "set_spawn_point"],
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
