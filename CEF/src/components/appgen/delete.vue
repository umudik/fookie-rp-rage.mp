<template>
    <v-dialog v-model="dialog" width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" color="red" size="36">
                <v-icon color="white">mdi-trash-can-outline</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="headline">Delete {{ model.name }}</span>
            </v-card-title>
            <v-card-text> Delete ID:{{ selectedId }} </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn color="red darken-1" text @click="del"> DELETE </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
export default {
    props: ["model", "selectedId"],
    data() {
        return {
            dialog: false,
        };
    },

    methods: {
        del: async function () {
            let id = this.selectedId;
            let model = this.model.name;
            await this.$store.dispatch("appgen", {
                method: "delete",
                model,
                query: {
                    where: {
                        id: {
                            $eq: id,
                        },
                    },
                },
            });
        },
    },
};
</script>

<style>
.ql-editor {
    min-height: 300px;
}
</style> 





