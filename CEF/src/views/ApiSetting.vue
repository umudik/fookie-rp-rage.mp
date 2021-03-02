<template>
    <div>
        <v-tabs>
            <v-tab>system_application</v-tab>
            <v-tab>system_model</v-tab>
            <v-tab>DEEP</v-tab>
            <v-tab>RAW </v-tab>
            <v-tab-item>
                <appgen-viewer :Model="'system_application'"></appgen-viewer
            ></v-tab-item>
            <v-tab-item>
                <appgen-viewer :Model="'system_model'"></appgen-viewer
            ></v-tab-item>
            <v-tab-item>
                {{ $store.state["system_application"].deepData }}
            </v-tab-item>
            <v-tab-item>
                {{ $store.state["system_application"].rawData }}
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>