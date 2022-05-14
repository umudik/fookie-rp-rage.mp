<template lang="pug">
v-app(app class="tw-bg-transparent")
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
html {
  background: transparent !important;
  background-color: transparent !important;
}
</style>
