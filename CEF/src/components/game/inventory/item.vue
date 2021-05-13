<template>
    <v-sheet dark height="75" width="75" color="grey darken-2">
        <v-sheet-title>{{ item.id }}</v-sheet-title>
        <v-sheet-text>{{ item.type }}</v-sheet-text>
        <v-sheet-footer>{{ item.amount }}</v-sheet-footer>
    </v-sheet>
</template>

<script>
export default {
    props: ["item"],
};
</script>

<style>
</style>