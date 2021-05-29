<template>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {};
    },
    mounted: async function () {
        if (this.$route.name == "home") {
            this.$router.push({ name: "login" });
        }
        let pool = await this.$store.dispatch("api", {
            attributes: "name display schema",
            method: "getAll",
            model: "system_model",
        });

        for (let model of pool) {
            console.log(model);
            this.$set(this.$store.state, pool.name, {
                name: model.name,
                display: model.display,
                schema: model.schema,
                pool: [],
            });
        }
    },
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
    display: none;
    width: 10px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
}
body {
    overflow: hidden;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
}
</style>
