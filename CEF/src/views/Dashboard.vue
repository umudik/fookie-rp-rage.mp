<template>
    <div>
        <v-card elevation="0" color="transparent">
            <v-card-title>{{ app.title }} Dashboard </v-card-title>
        </v-card>

        <div v-if="$route.query.id == 1">
            <ticket-dash />
        </div>
        <div v-if="$route.query.id == 2"></div>
        <div v-if="$route.query.id == 3"></div>
        <div v-if="$route.query.id == 4"></div>
        <div v-if="$route.query.id == 5"></div>
    </div>
</template>

<script>
import ticket_dash from "../components/dashboard/ticket-dashboard.vue";
export default {
    components: {
        "ticket-dash": ticket_dash,
    },
    computed: {
        app() {
            return this.$store.state["system_application"].rawData.find(
                (i) => i.id == this.$route.query.id
            );
        },
    },
};
</script>

<style>
</style>