<template>
    <v-card>
        <v-card-title>Logs</v-card-title>
        <v-card-text>
            <div v-for="(log, i) in $store.state['logs']" :key="i">
                {{ log }}
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            test: null,
        };
    },
    mounted: async function () {},
};
</script>

<style>
</style>