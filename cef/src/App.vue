<template lang="pug">
v-app(app)
  v-system-bar(dark lights-out)
    span Fookie RAGEMP
    v-spacer
    v-icon mdi-fire
    span 13:37
  v-main(app color="transparent")
    v-container
      router-view
</template>       
<script>
export default {
  data() {
    return {
      darkmode: true,
    };
  },
  mounted() {
    this.$vuetify.theme.dark = false;
  },
  watch: {
    darkmode(val) {
      val = !val;
      this.$vuetify.theme.dark = val;
    },
  },
};
</script>


<style>
::-webkit-scrollbar {
  display: none;
}
.v-application {
  background-color: var(--v-background-base) !important;
}
</style>
