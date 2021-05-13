<template>
    <v-card v-if="$store.state[Model].deepData" class="w-3/12 m-2" >
        <v-card-title>
            {{ body[$store.state[Model].options.fookie.display] }}
        </v-card-title>
        <v-card-text>hi</v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ["Model", "body"],
};
</script>

<style>
</style>