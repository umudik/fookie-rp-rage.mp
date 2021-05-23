<template>
    <div>
        <v-navigation-drawer permanent app>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        Fookie RP
                    </v-list-item-title>
                    <v-list-item-subtitle> Admin Panel </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list>
                <v-list-group
                    v-for="(menu, i) in $store.state.system_menu.pool"
                    :key="i"
                    :prepend-icon="menu.icon ? 'mdi-' + menu.icon : 'mdi-tag'"
                >
                    <template v-slot:activator>
                        <v-list-item-title>{{ menu.name }}</v-list-item-title>
                    </template>

                    <v-list-item
                        v-for="(
                            sub, i
                        ) in $store.state.system_submenu.pool.filter(
                            (s) => s.system_menu == menu._id
                        )"
                        :key="i"
                        link
                        class="ml-5"
                        @click="
                            selected = findItem(
                                'system_model',
                                sub.system_model
                            ).name
                        "
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-circle-small</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{
                            findItem("system_model", sub.system_model).name
                        }}</v-list-item-title>
                    </v-list-item>
                </v-list-group>
            </v-list>
            <v-divider></v-divider>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title> API </v-list-item-title>
                    <v-list-item-subtitle> All Models </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
                v-for="model in $store.state.system_model.pool"
                :key="'3' + model"
                link
                dense
                @click="selected = model.name"
            >
                <v-list-item-icon>
                    <v-icon dense>mdi-unfold-more-vertical</v-icon>
                </v-list-item-icon>
                <v-list-item-title>
                    {{ model.name }}
                </v-list-item-title>
            </v-list-item>
        </v-navigation-drawer>
        <fookie-viewer :model="$store.state[selected]"></fookie-viewer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selected: "system_model",
        };
    },
    mounted: async function () {
        for (let model of this.$store.state["system_model"].pool) {
            if (model.name != "system_model") {
                this.$set(this.$store.state, model.name, {
                    name: model.name,
                    display: model.display,
                    schema: this.$store.dispatch("api", {
                        method: "schema",
                        model: model.name,
                    }),
                    fookie: model.fookie,
                    pool: this.$store.dispatch("api", {
                        method: "getAll",
                        model: model.name,
                    }),
                });
            }
        }
    },
    methods: {
        findItem(model, id) {
            return this.$store.state[model].pool.find((i) => i._id == id);
        },
    },
};
</script>

<style>
</style>