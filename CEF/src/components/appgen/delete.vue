<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-avatar
                    v-bind="attrs"
                    v-on="on"                    
                    color="red"
                    size="36"
                >
                    <v-icon color="white">mdi-trash-can-outline</v-icon>
                </v-avatar>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Delete {{ Model }}</span>
                </v-card-title>
                <v-card-text> Delete ID:{{ id }} </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn color="red darken-1" text @click="del">
                        DELETE
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>
export default {
    props: ["Model", "id"],
    data() {
        return {
            dialog:false,
        };
    },

    methods: {
        del: async function () {
            let id = this.id;
            let model = this.Model;
            await this.$store.dispatch('appgen',{
                method: "delete",
                model,
                query:{
                    where:{
                        id:{
                            $eq:id
                        }
                    }
                }
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





