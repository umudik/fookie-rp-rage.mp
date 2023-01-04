<template lang="pug">
.tw-flex.tw-justify-center.tw-items-center.tw-min-h-screen
  v-card(width="600")
    v-card-title Login
    v-card-text
      v-text-field(
        label="E-mail",
        v-model="email",
        prepend-icon="mdi-account",
        :rules="[(v) => !!v || 'Username is required']"
      )
      v-text-field(
        label="Password",
        v-model="password",
        prepend-icon="mdi-lock",
        type="password",
        :rules="[(v) => !!v || 'Password is required']"
      )
    v-card-actions
      v-spacer
      v-btn(color="primary", dark, @click="login") login
</template>

<script>
const axios = require("axios");
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
      if (vue.$store.state.in_game) {
        await mp.trigger(
          "CEF_LOGIN",
          JSON.stringify({
            email: vue.email,
            password: vue.password,
          })
        );
      } else {
        const res = (
          await axios.post("http://localhost:2626", {
            model: "player",
            method: "login",
            query: {
              filter: {
                email: vue.email,
                password: vue.password,
              },
            },
          })
        ).data;
        if (res.status) {
          vue.$store.state.token = res.data.token;
          vue.$store.state.player_id = res.data.id;
        }
        console.log(res.data);
      }
    },
  },
  mounted: async function () {},
};
</script>
