<template lang="pug">
v-app(app)
  v-system-bar(dark lights-out)
    span Fookie RAGEMP
    v-spacer
    f-player-generate
    f-log
    v-icon mdi-fire
    v-icon(@click="openInventory") mdi-bag-personal
    span 13:37
  v-main(app color="transparent")
    v-container
      f-menu
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    openInventory() {
      const vue = this;
      vue.$store.dispatch("run", {
        model: "active_menu",
        method: "create",
        body: {
          tag: "inventory",
          entity: "player",
        },
      });
    },
  },
  mounted: async function () {},
};
</script>
