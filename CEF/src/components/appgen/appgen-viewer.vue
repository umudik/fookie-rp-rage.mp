<template>
    <v-card elevation="2" :key="$store.state[Model]">
        <v-card-title class="flex justify-between">{{ Model }} </v-card-title>
        <v-tabs>
            <v-tab v-for="item in ['List', 'Create', 'Options']" :key="item">
                {{ item }}
            </v-tab>
            <v-tab-item class="p-4">
                <v-select
                    v-model="filteredFields"
                    :items="headers"
                    attach
                    chips
                    label="Filtered Fields"
                    multiple
                    clearable
                ></v-select>
                <v-simple-table v-if="$store.state[Model].options">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th
                                    v-for="t in headers.filter(
                                        (k) => !filteredFields.includes(k)
                                    )"
                                    :key="t"
                                >
                                    <v-text-field
                                        :label="t"
                                        v-model="filters[t]"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(col, j) in filteredData"
                                :key="col + 'col' + j"
                            >
                                <td
                                    v-for="(field, i) in col"
                                    :key="field + 'field' + i"
                                >
                                    <appgen-field
                                        :Model="Model"
                                        :fieldName="i"
                                        :fieldValue="field"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-tab-item>
            <v-tab-item>
                <appgen-post :Model="Model"></appgen-post>
            </v-tab-item>
            <v-tab-item> {{ headers }} </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    props: ["Model"],
    data() {
        return {
            filters: {},
        };
    },
    methods: {},
    computed: {
        filteredFields() {
            return (
                this.$store.state[this.Model].options.fookie.filteredFields || [
                    "createdAt",
                    "updatedAt",
                    "id",
                ]
            );
        },
        headers() {
            return Object.keys(this.$store.state[this.Model].options.schema);
        },
        filteredData() {
            let res = [];
            let data = this.$store.state[this.Model].rawData;
            let filters = this.filters;
            for (let f in filters) {
                data = data.filter((field) =>
                    JSON.stringify(field[f])
                        .toLowerCase()
                        .includes(filters[f].toLowerCase())
                );
            }

            for (let i in data) {
                res[i] = {};
                for (let j in data[i]) {
                    if (!this.filteredFields.includes(j)) {
                        res[i][j] = data[i][j];
                    }
                }
            }

            return res;
        },
    },
};
</script>

<style>
</style>