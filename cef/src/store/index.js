import Vue from 'vue'
import Vuex from 'vuex'
import lodash from 'lodash'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    in_game: false,
    API_URL: null,
    token: null,
    player_id: null,
    models: {
      model: [],
    },
    menus: ["player_inventory"],
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
      state.models[payload.model] = state.models[payload.model].filter((i) => i.id != payload.query.where.id);
    },
    update(state, payload) {
      state.models[payload.model] = state.models[payload.model].filter((i) => i.id != payload.response.data.id);
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

      payload.token = ctx.state.token

      const res = await mp.events.callProc("apiProc", JSON.stringify(payload))
      ctx.commit("log", {
        title: `Response`,
        body: res
      })





      return JSON.parse(res)
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
