<template>
    <v-card elevation="2">
        <v-card-title class="flex justify-between"
            >{{ model.name }}
        </v-card-title>
        <v-tabs>
            <v-tab v-for="item in ['List', 'Create', 'Schema']" :key="item">
                {{ item }}
            </v-tab>
            <v-tab-item class="p-4">
                <v-data-iterator
                    :items="model.pool"
                    :items-per-page.sync="itemsPerPage"
                    :page.sync="page"
                >
                    <template v-slot:header>
                        <v-toolbar dark color="blue darken-3" class="mb-1">
                            <v-text-field
                                clearable
                                flat
                                solo-inverted
                                hide-details
                                prepend-inner-icon="mdi-magnify"
                                label="Search"
                            ></v-text-field>

                            <v-spacer></v-spacer>
                        </v-toolbar>
                    </template>

                    <template v-slot:default="props">
                        <v-row>
                            <v-col
                                v-for="item in props.items"
                                :key="item.id"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3"
                            >
                                <v-card>
                                    <v-list dense>
                                        <v-list-item
                                            v-for="(key, index) in Object.keys(
                                                model.schema
                                            )"
                                            :key="index"
                                        >
                                            <v-list-item-content
                                                :class="{
                                                    'blue--text':
                                                        sortBy === key,
                                                }"
                                            >
                                                {{ key }}:
                                            </v-list-item-content>
                                            <v-list-item-content
                                                class="align-end"
                                                :class="{
                                                    'blue--text':
                                                        sortBy === key,
                                                }"
                                            >
                                                {{ item[key.toLowerCase()] }}
                                            </v-list-item-content>
                                        </v-list-item>
                                    </v-list>
                                    <v-card-actions>
                                        <appgen-delete
                                            :model="model"
                                            :selectedId="item.id"
                                        ></appgen-delete>
                                    </v-card-actions>
                                </v-card>
                            </v-col>
                        </v-row>
                    </template>
                </v-data-iterator>
            </v-tab-item>
            <v-tab-item>
                <appgen-post :model="model"></appgen-post>
            </v-tab-item>
            <v-tab-item> {{ model.schema }} </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    props: ["model"],
    data() {
        return {
            filters: {},
            itemsPerPageArray: [4, 8, 12],
            search: "",
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
        };
    },
    methods: {},
    computed: {},
};
</script>

<style>
</style>