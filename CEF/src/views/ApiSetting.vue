<template>
    <div>
        <v-tabs>
            <v-tab
                v-for="(model, i) in $store.state['system_model'].pool"
                :key="'tab' + i"
                >{{ model.name }}</v-tab
            >
            <v-tab-item
                v-for="(model, i) in $store.state['system_model'].pool"
                :key="'item' + i"
            >
                <fookie-viewer
                    :model="$store.state[model.name]"
                ></fookie-viewer>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {
    mounted: async function () {
        for (let model of this.$store.state["system_model"].pool) {
            console.log(model);
            if (model.name != "system_model") {
                this.$set(this.$store.state, model.name, {
                    name: model.name,
                    display: model.display,
                    schema: model.schema,
                    fookie: model.fookie,
                    pool: [],
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

<style>
</style>