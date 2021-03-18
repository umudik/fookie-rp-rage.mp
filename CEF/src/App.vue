<template>
    <v-app class="myapp">    

    
        <v-main app class="myapp">
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
            <v-snackbar
      v-model="snackbar"
      timeout="2000"
    >
      Uyarı
    </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            snackbar:false
        };
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
