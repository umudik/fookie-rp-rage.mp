<template lang="pug">
div
  v-card(v-for="menu in $store.state.models['active_menu']")
    v-card-text {{menu}}       
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