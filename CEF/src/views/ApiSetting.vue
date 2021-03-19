<template>
    <div>
    jhj
        <v-tabs>
            <v-tab
                v-for="model in $store.state['system_model'].rawData"
                :key="model"
                >{{ model.name }}</v-tab
            >
            <v-tab-item
                v-for="model in $store.state['system_model'].rawData"
                :key="model"
            >
                <appgen-viewer :Model="model.name"></appgen-viewer
            ></v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>