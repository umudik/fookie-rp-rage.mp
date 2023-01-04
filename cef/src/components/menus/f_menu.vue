<template lang="pug">
div
  div(v-for="menu in $store.state.menus")
    div(v-if="menu === 'player_inventory'")
      f-inventory(
        :inventory_id="$store.state.player.inventory",
        :key="player.inventory"
      )
</template>

<script>
export default {
  data() {
    return {
      inventory: {},
      player: {},
    };
  },
  mounted: async function () {},
  methods: {},
  computed: {},
};
</script>

<style>
</style>