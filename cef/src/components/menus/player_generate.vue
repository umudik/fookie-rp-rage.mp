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
      v-card-actions
        v-spacer
        v-btn(color = "green" dark)
          v-icon mdi-check
            
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style>
</style>