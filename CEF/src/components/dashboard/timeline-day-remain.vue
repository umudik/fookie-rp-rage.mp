<template>
    <v-card>
        <v-card-title> Kalan güne göre kayıtlar </v-card-title>
        <v-card-subtitle>
            <v-range-slider
                hint="Gün aralığı belirleyin"
                max="30"
                min="0"
                v-model="range"
            ></v-range-slider>
        </v-card-subtitle>
        <v-card-text> Teslim için {{ range[0] }} ile {{ range[1] }} arası kalan kayıtlar </v-card-text>

        <v-timeline dense clipped>
            <v-timeline-item
                class="mb-4"
                small
                v-for="ticket in arr"
                :key="ticket"
                :hide-dot="typeof ticket == 'string'"
            >
                <v-row>
                    <v-col v-if="typeof ticket == 'string'">
                        <v-chip class="" color="red" label text-color="white">
                            <v-icon left> mdi-alert </v-icon>
                            {{ ticket }}
                        </v-chip>
                    </v-col>
                    <v-col v-else class="flex gap-4 items-center">
                        <v-card>
                            <v-card-title>
                                {{ ticket.name }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ ticket.deadline }}</v-card-subtitle
                            >
                            <v-card-text>
                                <appgen-field
                                    Model="Ticket"
                                    fieldName="status"
                                    :fieldValue="ticket.status"
                                ></appgen-field
                            ></v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-timeline-item>
        </v-timeline>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            range: [0, 7],
        };
    },
    computed: {
        arr() {
            let day = 1000 * 60 * 60 * 24;
            let arr = [];
            let data = this.$store.state["Ticket"].deepData;

            arr = arr.concat(
                data.filter(
                    (d) =>
                        new Date(d.deadline).getTime() - day * this.range[1] <= Date.now() &&
                        new Date(d.deadline).getTime() - day * this.range[0] > Date.now()
                )
            );
            return arr;
        },
    },
};
</script>

<style>
</style>