<template>
    <div class="flex flex-wrap gap-4">
        test
        <div v-for="menu in $store.state.menus" :key="menu">
            {{menu }}
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: ["inventory"],
        };
    },
};
</script>

<style>
</style>