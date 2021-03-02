<template>
    <v-app class="myapp">
        <v-app-bar app clipped-left clipped-right flat height="50" color="blue">
            <v-app-bar-nav-icon
                color="white"
                @click="$router.push({ name: 'app' })"
                >{{ $route.name }}</v-app-bar-nav-icon
            >
        </v-app-bar>
        <v-navigation-drawer app clipped>
            <v-list-item
                v-for="t in $store.state['system_model'].rawData"
                :key="t"
                link
                @click="
                    $router.push({
                        name: 'View',
                        query: {
                            model: t.name,
                        },
                    })
                "
            >
                <v-list-item-icon>
                    <v-icon>{{ t.icon || "mdi-help-circle-outline" }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ t.name }}</v-list-item-title>
            </v-list-item>
            <v-list-item
                link
                @click="
                    $router.push({
                        name: 'View',
                        query: { model: 'system_model' },
                    })
                "
            >
                <v-list-item-icon>
                    <v-icon>{{ "mdi-help-circle-outline" }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>system_model</v-list-item-title>
            </v-list-item>
            <v-list-item
                link
                @click="
                    $router.push({
                        name: 'Setting',
                    })
                "
            >
                <v-list-item-icon>
                    <v-icon>{{ "mdi-cog" }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Setting</v-list-item-title>
            </v-list-item>
        </v-navigation-drawer>
        <v-main app class="myapp">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
    mounted: async function () {
        this.$store.state["system_model"].options = await this.$store.dispatch(
            "appgen",
            {
                model: "system_model",
                method: "options",
                body: {
                    method: "post",
                },
            }
        );

        this.$store.state["system_model"].deepData = await this.$store.dispatch(
            "getAllDeep",
            {
                model: "system_model",
            }
        );

        this.$store.state["system_model"].rawData = await this.$store.dispatch(
            "appgen",
            {
                method: "getAll",
                model: "system_model",
            }
        );

        this.$store.state["system_model"].loading = false;

        for (let model of this.$store.state["system_model"].rawData) {
            this.$set(this.$store.state, model.name, {
                loading: true,
                options: { fields: undefined, appgen: undefined },
                deepData: [],
                rawData: [],
            });

            this.$store.state[model.name].options = await this.$store.dispatch(
                "appgen",
                {
                    model: model.name,
                    method: "options",
                    body: {
                        method: "post",
                    },
                }
            );

            this.$store.state[model.name].deepData = await this.$store.dispatch(
                "getAllDeep",
                {
                    model: model.name,
                }
            );

            this.$store.state[model.name].rawData = await this.$store.dispatch(
                "appgen",
                {
                    method: "getAll",
                    model: model.name,
                }
            );

            this.$store.state[model.name].loading = false;
        }
        this.$store.state.loading = false;
    },
};
</script>

<style >
.myapp {
    background-color: transparent !important;
}
</style>
