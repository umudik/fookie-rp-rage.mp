<template>
    <v-expansion-panels>
        <v-expansion-panel v-for="(log, i) in $store.state['logs']" :key="i">
            <v-expansion-panel-header>
                {{ log.title }}
            </v-expansion-panel-header>
            <v-expansion-panel-content>
                {{ log.body }}
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
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