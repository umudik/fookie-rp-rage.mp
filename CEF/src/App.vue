<template>
    <v-app style="background-color: transparent">
        <v-system-bar dark app height="30">
            <v-ststem-bar-title>UmudikRP</v-ststem-bar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$router.push({ name: 'api' })">mdi-home</v-icon>
            <v-icon @click="$router.push({ name: 'setting' })">mdi-cog</v-icon>
            <v-icon @click="$router.push({ name: 'settings' })"
                >mdi-account</v-icon
            >
            <v-icon @click="$router.push({ name: 'web' })">mdi-web</v-icon>
            <v-icon @click="$router.push({ name: 'help' })">mdi-help</v-icon>
            <span>12:30</span>

            <v-avatar
                class="ml-1"
                :color="$store.state.inGame ? 'teal' : 'red'"
                size="12"
            ></v-avatar>
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
            "api",
            {
                method: "getAll",
                model: "system_model",
            }
        );

        this.$store.state["system_model"].schema = await this.$store.dispatch(
            "api",
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

                this.$store.state[
                    model.name
                ].schema = await this.$store.dispatch("api", {
                    model: model.name,
                    method: "schema",
                    body: {
                        method: "write",
                    },
                });

                this.$store.state[model.name].pool = await this.$store.dispatch(
                    "api",
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
