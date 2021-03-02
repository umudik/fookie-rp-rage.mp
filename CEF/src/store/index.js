import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

/* eslint-disable */

export default new Vuex.Store({

    state: {
        system_model: {
            loading: true,
            options: { fields: undefined, appgen: undefined },
            deepData: [],
            rawData: [],
        },

        system_application: {
            loading: true,
            options: { fields: undefined, appgen: undefined },
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
            let res = await mp.events.callProc('local', JSON.stringify(payload))
            return JSON.parse(res);
        }
    },
    modules: {}
});