<template>
    <v-app style="background-color: transparent">
        <v-system-bar dark app height="30">
            <v-ststem-bar-title>UmudikRP</v-ststem-bar-title>
            <v-spacer></v-spacer>
            <v-icon @click="$router.push({ name: 'game' })">mdi-play</v-icon>
            <v-icon @click="$router.push({ name: 'api' })">mdi-home</v-icon>
            <v-icon @click="$router.push({ name: 'setting' })">mdi-cog</v-icon>
            <v-icon @click="$router.push({ name: 'settings' })"
                >mdi-account</v-icon
            >
            <v-icon @click="$router.push({ name: 'web' })">mdi-web</v-icon>
            <v-icon @click="$router.push({ name: 'help' })">mdi-help</v-icon>
            <span>12:30</span>

            <v-avatar
                @click="$store.state.inGame = !$store.state.inGame"
                class="ml-1"
                :color="$store.state.inGame ? 'green' : 'red'"
                size="12"
            ></v-avatar>
        </v-system-bar>
        <v-main app>
            <v-container fluid>
                <router-view></router-view>
            </v-container>
        </v-main>
        <v-snackbar
            right
            light
            absolute
            :color="$store.state.snackbar.color"
            :timeout="1500"
            v-model="$store.state.snackbar.opened"
        >
            {{ $store.state.snackbar.text }}
        </v-snackbar>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
    mounted: async function () {},
};
</script>

<style >
.justify-center {
    justify-content: center;
}
.flex-wrap {
    flex-wrap: wrap;
}
.myapp {
    background-color: transparent !important;
}
</style>
