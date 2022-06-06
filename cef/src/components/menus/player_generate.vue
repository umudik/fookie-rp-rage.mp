<template lang="pug">
v-dialog(width="600")   
  template(v-slot:activator="{ on, attrs }")   
    v-btn(v-bind="attrs" v-on="on" icon small )       
      v-icon(small) mdi-account
  div
    v-card
      v-card-title Edit Player
      v-card-text 
        v-text-field(label="Name" )
        v-text-field(label="Age"  type="number" min="18" max="99")
      v-card-title Cloth
      v-card-text
        div( v-for ="item of cloth_keys")
          v-slider(:label="item +  ' drawable'" min="-1" max="255" thumb-label step="1")
          v-slider(:label="item + ' texture'" min="-1" max="255" thumb-label step="1")
      v-card-title Customization
      v-card-text 
        v-slider(:label="item" v-for ="item of one_zero_keys" min="-1" max="1" thumb-label step="0.01")
      v-card-actions
        v-spacer
        v-btn(color = "green" dark)
          v-icon mdi-check
            
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {
      player_cloth: {
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
      },
      player_zero_one_keys: {
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
      },
    };
  },
  mounted() {},
  methods: {},
  computed: {
    cloth_keys() {
      return lodash.keys(this.player_cloth);
    },
    one_zero_keys() {
      return lodash.keys(this.player_zero_one_keys);
    },
  },
};
</script>

<style>
</style>