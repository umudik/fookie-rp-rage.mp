<template>
    <div class="d-flex wrap gap-8">
        <div v-for="(menu, i) in $store.state.menus" :key="i">
            <game-inventory
                v-if="menu.type == 'inventory'"
                :selectedId="menu.id"
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    mounted: async function () {},
};
</script>

<style>
</style>