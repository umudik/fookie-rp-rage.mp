import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);

/* eslint-disable */

export default new Vuex.Store({

    state: {
        baseURL: "http://localhost:7777",
        inGame: false,
        system_model: {
            loading: true,
            options: { schema: undefined, fookie: undefined },
            deepData: [],
            rawData: [],
        },
        self: {},
        token: null,
    },
    mutations: {},
    actions: {
        getAllDeep: async function(ctx, req) {
            let res = await ctx.dispatch('appgen', {
                model: req.model,
                method: "options",
                body: {
                    method: "get",
                },

            });
            let schema = res;

            let items = await ctx.dispatch('appgen', { method: "getAll", model: req.model })
            for (let i in items) {
                for (let f in items[i]) {
                    if (schema.fields[f]) {
                        if (schema.fields[f].relation) {
                            let relation = schema.fields[f].relation
                            let where = {}
                            where[relation.key] = items[i][f]
                            let data = await ctx.dispatch('appgen', {
                                method: "get",
                                model: relation.model,
                                query: {
                                    where
                                }
                            })
                            items[i][f] = data || '-'
                        }
                    }
                }
            }
            return items



        },
        appgen: async function(ctx, payload) {
            if (ctx.state.inGame) {
                let res = await mp.events.callProc('local', JSON.stringify(payload))
                return JSON.parse(res);
            } else {
                let res = await axios.post(ctx.state.baseURL, payload, {
                    headers: {
                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjIwNTQ0ODcwfQ.eLvvSHODD7W6XvZgEd6XtFIZBPmb877WUU5ytG99Thw"
                    }
                })
                return res.data
            }

        }
    },
    modules: {}
});