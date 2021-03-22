<template>
    <div>
        <v-tabs>
            <v-tab
                v-for="(model, i) in $store.state['system_model'].rawData"
                :key="i"
                >{{ model.name }}</v-tab
            >
            <v-tab-item
                v-for="(model, i) in $store.state['system_model'].rawData"
                :key="i"
            >
                <appgen-viewer :Model="model.name"></appgen-viewer>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>