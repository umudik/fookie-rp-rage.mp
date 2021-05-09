<template>
    <div>
        <v-tabs>
            <v-tab
                v-for="(model,i) in $store.state['system_model'].pool"
                :key="i"
                >{{ model.name }}</v-tab
            >
            <v-tab-item
                v-for="(model,i) in $store.state['system_model'].pool"
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
export default {};
</script>

<style>
</style>