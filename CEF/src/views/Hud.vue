<template>
    <div>
        asdfasdf
        <form>
            <v-text-field
                v-model="email"
                label="Username"                
            ></v-text-field>
            <v-text-field
                v-model="password"
                label="Password"            
            ></v-text-field>

            <v-btn class="mr-4">Login </v-btn>
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
};
</script>

<style>
</style>