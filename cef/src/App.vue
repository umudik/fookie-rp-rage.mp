<template lang="pug">
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
    if (this.$store.state.token) {
      this.$router.push({ name: "game" });
    } else {
      this.$router.push({ name: "login" });
    }
  },
  watch: {
    "$store.state.token": function (val) {
      if (val.length > 0 && typeof val == "string") {
        this.$router.push({ name: "game" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
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
body {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
