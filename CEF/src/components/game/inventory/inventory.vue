<template>
    <v-sheet height="800" width="400" color="grey darken-3">
        <div class="d-flex gap-1 justify-around flex-wrap">
            <game-item v-for="(item, i) in items" :key="i" :item="item" />
        </div>
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