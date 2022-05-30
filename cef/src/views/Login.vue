<template lang="pug">
div(class="tw-flex tw-justify-center tw-items-center tw-min-h-screen")
  v-card(width="600")
    v-card-title Login
    v-card-text
      v-text-field(label="E-mail" v-model="email" prepend-icon="mdi-account" :rules="[v => !!v || 'Username is required']")
      v-text-field(label="Password" v-model="password" prepend-icon="mdi-lock" type="password" :rules="[v => !!v || 'Password is required']")
    v-card-actions
      v-spacer
      v-btn(color="primary" dark @click="login") login
</template>

<script>
import axios from "axios";
import lodash from "lodash";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: async function () {
      const vue = this;
      let res = await mp.trigger(
        "CEF_LOGIN",
        JSON.stringify({
          email: vue.email,
          password: vue.password,
        })
      );
    },
  },
  mounted: async function () {},
};
</script>
