<template>
    <v-card elevation="2">
        <v-card-title>{{ model }} filtered by {{ field }}</v-card-title>
        <v-card-subtitle
            >Basic Count Chart Field:[{{ field }}] | Title:[{{
                deepField
            }}]</v-card-subtitle
        >
        <v-card-text>
            <apexchart
                type="donut"
                :options="options"
                :series="series"
            ></apexchart>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: ["model", "field", "deepField"],
    data() {
        return {
            series: [],
            options: {
                legend: {
                    show: true,
                    position: "bottom",
                },
                plotOptions: {
                    pie: {
                        donut: {
                            labels: {
                                show: true,
                            },
                        },
                    },
                },
                labels: [],
            },
        };
    },
    mounted() {
        let arr = new Set(
            this.$store.state[this.model].deepData.map(
                (i) => i[this.field][this.deepField]
            )
        );
        let set = Array.from(arr);
        for (let i in set) {
            this.options.labels.push(set[i]);
            this.series.push(
                this.$store.state[this.model].deepData.filter(
                    (item) => item[this.field][this.deepField] === set[i]
                ).length
            );
        }
    },
};
</script>

<style>
</style>