<template>
    <div>
        <v-tabs>
            <v-tab
                v-for="(model, i) in $store.state['system_model'].pool"
                :key="i"
                >{{ model.name }}</v-tab
            >
            <v-tab-item
                v-for="(model, i) in $store.state['system_model'].pool"
                :key="i"
            >
                <appgen-viewer
                    :model="$store.state[model.name]"
                ></appgen-viewer>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {
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

                this.$store.state[
                    model.name
                ].schema = await this.$store.dispatch("appgen", {
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

<style>
</style>