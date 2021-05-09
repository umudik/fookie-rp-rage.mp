<template>
    <v-app style="background-color: transparent">
        <v-system-bar lights-out app height="30">
            <v-switch
                dense
                v-model="$store.state.inGame"
                label="Game"
            ></v-switch>
            <v-spacer></v-spacer>
            <v-icon @click="$router.push({ name: 'api' })">mdi-home</v-icon>
            <v-icon @click="$router.push({ name: 'setting' })">mdi-cog</v-icon>
            <v-icon @click="$router.push({ name: 'settings' })"
                >mdi-account</v-icon
            >
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
        this.$store.state["system_model"].pool = await this.$store.dispatch(
            "appgen",
            {
                method: "getAll",
                model: "system_model",
            }
        );

        this.$store.state["system_model"].schema = await this.$store.dispatch(
            "appgen",
            {
                method: "schema",
                model: "system_model",
                body: {
                    method: "write",
                },
            }
        );

        for (let model of this.$store.state["system_model"].pool) {
            if (model.name != "system_model") {
                this.$set(this.$store.state, model.name, {
                    display: "id",
                    schema: undefined,
                    pool: [],
                });

                this.$store.state[model.name].schema = await this.$store.dispatch("appgen", {
                    model: model.name,
                    method: "schema",
                    body: {
                        method: "write",
                    },
                });

                this.$store.state[model.name].pool = await this.$store.dispatch(
                    "appgen",
                    {
                        method: "getAll",
                        model: model.name,
                    }
                );
            }
        }
    },
};
</script>

<style >
.myapp {
    background-color: transparent !important;
}
</style>
