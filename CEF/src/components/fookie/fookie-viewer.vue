
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
        no-data-text="İçerik bulunamadı"
        no-results-text="Aramanızla eşleşen içerik yok"
    >
        <template v-slot:header>
            <v-toolbar class="mb-1">
                <v-text-field
                    v-model="search"
                    clearable
                    flat
                    hide-details
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    solo
                ></v-text-field>
                <v-spacer></v-spacer>

                <v-spacer></v-spacer>
                <fookie-post :model="model" />
            </v-toolbar>
        </template>

        <template v-slot:default="props">
            <v-row>
                <v-col
                    v-for="(item, i) in props.items"
                    :key="i"
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
                            <v-list-item v-for="(key, i) in keys" :key="i">
                                <v-list-item-content>
                                    {{ key }}:
                                </v-list-item-content>
                                <v-list-item-content class="align-end">
                                    {{ getContent(item, key) }}
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        <v-card-actions class="card-action">
                            <v-btn-toggle mandatory dark>
                                <fookie-post
                                    :model="model"
                                    :selectedId="item._id"
                                />
                                <fookie-delete
                                    :model="model"
                                    :selectedId="item._id"
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
export default {
    props: ["model", "query", "filters"],
    data() {
        return {
            itemsPerPageArray: [4, 8, 12],
            search: "",
            filter: {},
            page: 1,
            itemsPerPage: 4,
        };
    },
    computed: {
        items() {
            return this.model.pool;
        },
        keys() {
            return ["_id"].concat(Object.keys(this.model.schema));
        },
        numberOfPages() {
            return Math.ceil(this.items.length / this.itemsPerPage);
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
            if (key == "_id") return item[key];
            if (typeof this.model.schema[key].relation === "string") {
                let maybe = this.$store.state[
                    this.model.schema[key].relation
                ].pool.find((i) => i._id == item[key]);
                if (!maybe) return "-";
                return maybe[
                    this.$store.state[this.model.schema[key].relation].display
                ];
            }
            return item[key] || "--";
        },
    },
};
</script>




<style lang="scss">
.card-action {
    flex-direction: row-reverse;
}
</style>
