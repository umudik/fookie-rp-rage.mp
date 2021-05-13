<template>
    <v-sheet height="600" width="400" color="red darken-2">
        <v-sheet-title>inventory</v-sheet-title>
        <v-sheet-text class="d-flex gap-1 justify-center flex-wrap">
            <game-item v-for="(item, i) in items" :key="i" :item="item" />
        </v-sheet-text>
    </v-sheet>
</template>

<script>
export default {
    props: ["selectedId"],
    computed: {
        items() {
            return this.$store.state.item.pool.filter(
                (i) => i.inventory == this.selectedId
            );
        },
    },
};
</script>

<style>
</style>