<template>
    <v-app style="background-color: transparent">
        <v-system-bar dark app height="30" lights-out>
            <v-system-bar-title>RP</v-system-bar-title>
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
.justify-between {
    justify-content: space-between;
}
.justify-around {
    justify-content: space-around;
}
.flex-wrap {
    flex-wrap: wrap;
}
.myapp {
    background-color: transparent !important;
}


::-webkit-scrollbar {
    width: 10px;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
</style>
