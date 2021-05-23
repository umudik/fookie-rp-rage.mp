import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);

/* eslint-disable */

export default new Vuex.Store({
    state: {
        logs: [],
        token: null,
        baseURL: "http://localhost:7777",
        inGame: false,
        system_model: {
            pool: [],
            display: "name",
            name: "system_model",
            schema: {}
        },
        snackbar: {
            text: "Ok",
            opened: false,
            color: "success",
        },
        menus: [
            { type: "inventory", _id: 1 },
        ],
        token: null,
    },
    mutations: {
        getAll(state, payload) {
            state[payload.model].pool = payload.response.data;
        },

        get(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        post(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        remove(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.query.where._id);
        },
        patch(state, payload) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i._id != payload.response.data._id);
            state[payload.model].pool.push(payload.response.data);
        },
        schema(state, payload) {
            state[payload.model].schema = payload.response.data
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
        api: async function (ctx, payload) {
            payload.token = localStorage.getItem("token")
            ctx.commit("log", {
                title: `REQUEST -> Method:${payload.method} | Model:${payload.model}`,
                body: payload
            })
            if (ctx.state.inGame) {
                payload.response = JSON.parse(await mp.events.callProc('apiProc', JSON.stringify(payload)))
            } else {
                payload.response = await axios.post(ctx.state.baseURL, payload, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                })
            }

            ctx.dispatch("apiSync", payload)
            return payload.response.data
        },
        apiSync(ctx, payload) {
            if (payload.response.status == 200) {
                if (payload.method === 'delete') payload.method = 'remove'; // delete resevered keyword

                ctx.commit(payload.method, payload);
                ctx.commit("snackbar", { color: "success", text: `Method:${payload.method.toUpperCase()} | Model:${payload.model}` });

            } else {
                ctx.commit("log", {
                    title: `Status:${payload.response.status} | Method:${payload.method} | Model:${payload.model}`,
                    body: payload.response
                })
                ctx.commit("snackbar", { color: "error", text: `Status:${payload.response.status} | Method:${payload.method} | Model:${payload.model}` });
            }


        },
    },
    modules: {}
});