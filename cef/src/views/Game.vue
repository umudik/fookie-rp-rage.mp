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
import axios from "axios";
import lodash from "lodash";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted: async function () {},
};
</script>
