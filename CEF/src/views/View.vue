<template>
    <div :key="$route.query.model">
        <appgen-viewer  v-if="!$store.state.loading" :Model="$route.query.model"></appgen-viewer>
    </div>
</template>

<script>
export default {};
</script>

<style>
</style>