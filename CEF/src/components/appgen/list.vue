
<template>
    <v-data-iterator
        :items="items"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        :search="search"
        sort-by="createdAt"
        :sort-desc="sortDesc"
        disable-pagination
        hide-default-footer
        class="pt-2"
        no-data-text="İçerik bulunamadı"
        no-results-text="Aramanızla eşleşen içerik yok"
    >
        <template v-slot:header>
            <v-toolbar class="mb-1" color="blue darken-3" dark>
                <v-text-field
                    v-model="search"
                    clearable
                    flat
                    hide-details
                    label="Ara..."
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-select
                    v-if="model === 'order' && getUserType !== 'driver'"
                    v-model="sortBy"
                    :items="
                        ['Tümü'].concat(
                            Object.keys(statuses).map((x) => ({
                                text: statuses[x].label,
                                value: x,
                            }))
                        )
                    "
                    flat
                    hide-details
                    label="Sırala"
                    prepend-inner-icon="mdi-magnify"
                    solo-inverted
                ></v-select>
                <template v-if="$vuetify.breakpoint.mdAndUp">
                    <v-spacer></v-spacer>
                    <v-btn-toggle v-model="sortDesc" mandatory>
                        <v-btn :value="false" color="blue" depressed large>
                            <v-icon>mdi-arrow-up</v-icon>
                        </v-btn>
                        <v-btn :value="true" color="blue" depressed large>
                            <v-icon>mdi-arrow-down</v-icon>
                        </v-btn>
                    </v-btn-toggle>
                </template>
                <v-spacer v-if="getUserType === 'admin'"></v-spacer>
                <appgen-post v-if="getUserType === 'admin'" :model="model" />
            </v-toolbar>
        </template>

        <template v-slot:default="props">
            <v-row>
                <v-col
                    v-for="item in props.items"
                    :key="item.id"
                    cols="12"
                    md="3"
                    sm="6"
                >
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">{{
                            item.name
                        }}</v-card-title>

                        <v-divider></v-divider>

                        <v-list dense>
                            <v-list-item
                                v-for="(key, index) in filteredKeys"
                                :key="index"
                            >
                                <v-list-item-content>
                                    {{
                                        getSchema[key].label
                                    }}:</v-list-item-content
                                >
                                <v-list-item-content class="align-end">
                                    {{ getContent(item, key) }}
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-card-actions class="card-action">
                            <v-btn-toggle mandatory dark>
                                <appgen-post
                                    v-if="getUserType === 'admin'"
                                    :model="model"
                                    :selectedId="item.id"
                                />
                                <appgen-delete
                                    v-if="getUserType === 'admin'"
                                    :model="model"
                                    :selectedId="item.id"
                                />
                            </v-btn-toggle>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </v-data-iterator>
</template>


<script>
import vue from "vue";

export default vue.extend({
    props: {
        model: {
            type: String,
        },
        admin: {
            type: Boolean,
            default: () => {
                return false;
            },
        },
        actions: {
            type: Array,
            default: () => {
                return ["post", "delete", "patch"];
            },
        },
    },
    data() {
        return {
            itemsPerPageArray: [4, 8, 12],
            search: "",
            filter: {},
            sortDesc: false,
            page: 1,
            itemsPerPage: 4,
            sortBy: null,
        };
    },
    computed: {
        getUserType() {
            return this.$store.state.self.user.type;
        },
        items() {
            if (this.sortBy == null || this.sortBy == "Tümü") {
                return this.$store.state[this.model].pool;
            } else {
                return this.$store.state[this.model].pool.filter(
                    (x) => x.status === this.sortBy
                );
            }
        },
        keys() {
            return Object.keys(this.$store.state[this.model].schema);
        },
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
        },
        filteredKeys() {
            return this.keys
                .filter(
                    (key) =>
                        key !== "name" && key !== "password" && key !== "id"
                )
                .filter(
                    (k) =>
                        this.getSchema[k][
                            this.$store.state.self.user.type || "driver"
                        ].read === true
                );
        },
        getSchema() {
            return this.$store.state[this.model].schema;
        },
    },
    methods: {
        nextPage() {
            if (this.page + 1 <= this.numberOfPages) this.page += 1;
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1;
        },
        updateItemsPerPage(number) {
            this.itemsPerPage = number;
        },
        getContent(item, key) {
            if (this.getSchema[key].input === "relation") {
                let maybe = this.$store.state[
                    this.getSchema[key].relation.model
                ].pool.find((i) => i.id === item[key]);
                if (!maybe) return "-";
                return maybe[
                    this.$store.state[this.getSchema[key].relation.model]
                        .display
                ];
            }
            return item[key] || "-";
        },
    },
});
</script>




<style lang="scss">
.card-action {
    flex-direction: row-reverse;
}
</style>
