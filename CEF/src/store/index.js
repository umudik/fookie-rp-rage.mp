import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);

/* eslint-disable */

export default new Vuex.Store({
    state: {
        logs: [],
        baseURL: "http://localhost:7777",
        inGame: true,
        system_model: {
            loading: true,
            options: { schema: undefined, fookie: undefined },
            deepData: [],
            rawData: [],
        },
        snackbar: {
            text: "Ok",
            opened: false,
            color: "success",
        },
        menus: [
            { type: "inventory", id: 1 },
        ],
        token: null,
    },
    mutations: {
        getAll(state, { res, payload }) {
            state[payload.model].pool = res.data;
        },
        get(state, { res, payload }) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i.id != res.data.id);
            state[payload.model].pool.push(res.data);
        },
        post(state, { res, payload }) {
            state[payload.model].pool.push(res.data);
        },
        remove(state, { res, payload }) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i.id != payload.query.where.id);
        },
        patch(state, { res, payload }) {
            state[payload.model].pool = state[payload.model].pool.filter((i) => i.id != res.data.id);
            state[payload.model].pool.push(res.data);
        },
        schema(state, { res, payload }) {
            state[payload.model].schema = res.data
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
            let res = null
            if (ctx.state.inGame) {
                res = await mp.events.callProc('local', JSON.stringify(payload))
            } else {
                res = await axios.post(ctx.state.baseURL, payload, {
                    headers: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTQ0ODcwfQ.eLvvSHODD7W6XvZgEd6XtFIZBPmb877WUU5ytG99Thw"
                    }
                })
            }


            if (res.status == 200) {
                if (payload.method === 'delete') payload.method = 'remove'; // delete resevered keyword
                ctx.commit(payload.method, { res, payload });
                ctx.commit("snackbar", { color: "success", text: `Method:${payload.method.toUpperCase()} | Model:${payload.model}` });

            } else {
                ctx.commit("snackbar", { color: "error", text: `Status:${res.status} | Method:${payload.method} | Model:${payload.model}` });
            }

            ctx.commit("log", {
                title: `Status:${res.status} | Method:${payload.method} | Model:${payload.model}`,
                body: res
            })

            return res.data
        }
    },
    modules: {}
});