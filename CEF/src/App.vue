<template>
    <v-app>
        <v-system-bar lights-out app height="30">
            <v-switch
                dense
                v-model="$store.state.inGame"
                label="Game"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-icon @click="$router.push({ name: 'home' })">mdi-home</v-icon>
            <v-icon @click="$router.push({ name: 'api' })">mdi-cog</v-icon>
            <v-icon @click="$router.push({ name: 'settings' })">mdi-account</v-icon>
            <v-icon @click="$router.push({ name: 'web' })">mdi-web</v-icon>
            <v-icon @click="$router.push({ name: 'help' })">mdi-help</v-icon>
            <span>12:30</span>
        </v-system-bar>
        <v-main app>
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
                    method: "write",
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
