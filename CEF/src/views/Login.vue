<template>
    <div>
        <form>
            <v-text-field v-model="email" label="E-Mail"></v-text-field>
            <v-text-field v-model="password" label="Password"></v-text-field>
            <v-btn @click="login">Login </v-btn>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        login: async function () {
            let body = { email: this.email, password: this.password };
            let res = await this.$store.dispatch("api", {
                method: "login",
                model: "system_user",
                body,
            });
            console.log(res);
            localStorage.setItem("token", res);
            this.$router.push({ name: "game" });
        },
    },
};
</script>

<style>
</style>