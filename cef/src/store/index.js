import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import lodash from 'lodash'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: "",
    token: "",
    models: {
      model: [],
    },
    logs: [],
    loadings: [],
  },
  mutations: {
    read(state, payload) {
      state.models[payload.model] = payload.response.data;
    },
    create(state, payload) {
      console.log(payload.response.data);
      state.models[payload.model].push(payload.response.data);
    },
    remove(state, payload) {
      state.models[payload.model] = state.models[payload.model].filter((i) => i._id != payload.query.where._id);
    },
    update(state, payload) {
      state.models[payload.model] = state.models[payload.model].filter((i) => i._id != payload.response.data._id);
      state.models[payload.model].push(payload.response.data);
    },
    login(state, payload) {
      state.token = payload
      localStorage.setItem("token", payload)

    },
    log(state, payload) {
      state.logs.push({
        index: state.logs.length + 1,
        title: payload.title,
        body: payload.body
      })
    },
    snackbar(state, payload) {
      state.snackbar = {
        opened: true,
        text: payload.text,
        color: payload.color
      }
    },
  },
  actions: {
    run: async function (ctx, payload) {
      if (payload.method == "read") {
        ctx.state.loadings.push(payload.model)
      }
      payload.token = localStorage.getItem("token") || "admin"
      ctx.commit("log", {
        title: `REQUEST -> Method:${payload.method} | Model:${payload.model}`,
        body: payload
      })

      const apiCall = await axios.post(ctx.state.API_URL, payload, {
        headers: {
          token: localStorage.getItem("token")
        }
      })
      payload.response = apiCall.data
      if (payload.method == "read") {
        ctx.state.loadings = lodash.remove(ctx.state.loadings, payload.model)
      }

      ctx.dispatch("sync", payload)
      return payload.response.data
    },
    sync(ctx, payload) {
      if (payload.response.status == true) {
        if (payload.method === 'delete') payload.method = 'remove'; // delete resevered keyword

        ctx.commit(payload.method, payload);
        // ctx.commit("snackbar", { color: "success", text: `Method:${payload.method.toUpperCase()} | Model:${payload.model}` });

      } else {
        ctx.commit("log", {
          title: `Status:${payload.response.status} | Method:${payload.method} | Model:${payload.model}`,
          body: payload.response
        })
        ctx.commit("snackbar", { color: "error", text: `Status:${payload.response.status} | Method:${payload.method} | Model:${payload.model}` });
      }
    },
  },
})
