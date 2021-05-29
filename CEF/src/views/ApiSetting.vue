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
                    v-for="menu in menus"
                    :key="JSON.stringify(menu) + Math.random()"
                    :prepend-icon="menu.icon ? 'mdi-' + menu.icon : 'mdi-tag'"
                >
                    <template v-slot:activator>
                        <v-list-item-title>{{ menu.name }}</v-list-item-title>
                    </template>

                    <v-list-item
                        v-for="sub in $store.state.system_submenu.pool.filter(
                            (s) => s.system_menu == menu._id
                        )"
                        :key="JSON.stringify(sub) + Math.random()"
                        link
                        class="ml-5"
                        @click="
                            selected = $store.state[model.name].pool.find(
                                (i) => i._id == id
                            )
                        "
                    >
                        <v-list-item-icon>
                            <v-icon>mdi-circle-small</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>{{ sub.name }}</v-list-item-title>
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
                :key="JSON.stringify(model) + Math.random()"
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
        console.log(this.$store.state.system_model.pool);

        for (let model of this.$store.state.system_model.pool) {
            console.log(model.name);
            this.$store.state[model.name].pool = await this.$store.dispatch(
                "api",
                {
                    method: "getAll",
                    model: model.name,
                }
            );
        }
    },
    methods: {},
    computed: {
        menus() {
            return this.$store.state.system_menu.pool;
        },
    },
};
</script>

<style>
</style>