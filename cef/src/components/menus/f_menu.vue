<template lang="pug">
div
  div(v-for="menu in $store.state.menus")
    div(v-if="menu === 'player_inventory'")
      f-inventory(:inventory_id = "player.inventory" :key="player.inventory")
    
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
  watch: {
    "$store.state.player_id": async function (value) {
      const vue = this;
      this.player = (
        await vue.$store.dispatch("run", {
          model: "player",
          method: "read",
          query: {
            filter: {
              pk: value,
            },
          },
        })
      ).data[0];
    },
  },
};
</script>

<style>
</style>