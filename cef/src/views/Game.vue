<template lang="pug">
v-app(app)
  v-system-bar(dark lights-out)
    span Fookie RAGEMP
    v-spacer
    span {{ $store.state.API_URL }}
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
    openInventory() {},
  },
  mounted: async function () {},
};
</script>
