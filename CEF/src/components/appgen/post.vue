<template>
    <v-dialog
        elevation="3"
        v-model="dialog"
        width="700"
        v-if="typeof $store.state[Model].options.fields == 'object'"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn fab dark small color="green" v-bind="attrs" v-on="on">
                <v-icon> mdi-plus </v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title>Create {{ Model }}</v-card-title>
            <v-card-text v-if="fields">
                <v-row v-for="(sch, i) in fields" :key="i">
                    <!-- ------------------ -->
                    <v-text-field
                        prepend-icon="mdi-text"
                        v-if="sch.appgen.input == 'text'"
                        :label="i"
                        v-model="body[i]"
                    ></v-text-field>

                    <!-- ------------------ -->
                    <v-text-field
                        v-if="sch.appgen.input == 'password'"
                        :label="i"
                        v-model="body[i]"
                        prepend-icon="mdi-lock"
                        :append-icon="menus[i] ? 'mdi-eye' : 'mdi-eye-off'"
                        type="password"
                        hint="At least 8 characters"
                        @click:append="menus[i] = !menus[i]"
                    ></v-text-field>

                    <!-- ------------------ -->
                    <!-- ------------------ -->
                    <v-text-field
                        v-if="sch.appgen.input == 'number'"
                        :label="i"
                        v-model="body[i]"
                        prepend-icon="mdi-numeric"
                        type="number"
                    ></v-text-field>

                    <!-- ------------------ -->
                    <v-menu
                        v-if="sch.appgen.input == 'time'"
                        v-model="menus[i]"
                        :nudge-right="40"
                        :return-value.sync="syncs[i]"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="body[i]"
                                :label="i"
                                prepend-icon="mdi-clock-time-four-outline"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-time-picker
                            v-if="menus[i]"
                            format="24hr"
                            v-model="body[i]"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                        ></v-time-picker>
                    </v-menu>

                    <!-- ------------------ -->

                    <v-menu
                        v-if="sch.appgen.input == 'color'"
                        :return-value.sync="syncs[i]"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                :background-color="body[i] ? body[i].hexa : ''"
                                v-model="body[i]"
                                :label="i"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-color-picker
                            dot-size="20"
                            mode="hexa"
                            v-model="body[i]"
                        ></v-color-picker>
                    </v-menu>
                    <!-- ------------------ -->
                    <v-menu
                        v-if="sch.appgen.input == 'date'"
                        v-model="menus[i]"
                        :return-value.sync="syncs[i]"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="body[i]"
                                :label="i"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model="body[i]" scrollable>
                        </v-date-picker>
                    </v-menu>
                    <!---------------------->

                    <div v-if="sch.appgen.input == 'rich'">
                        <quill-editor ref="myQuillEditor" v-model="body[i]" />
                    </div>
                    <!-- ------------------ -->
                    {{ i }}
                    <v-jsoneditor
                        v-if="sch.appgen.input == 'json'"
                        v-model="body[i]"
                        :plus="false"
                        height="400px"
                        :options="{ mode: 'code' }"
                    />

                    <!-- ------------------ -->
                    <v-sheet class="">
                        <v-switch
                            v-if="sch.appgen.input == 'boolean'"
                            v-model="body[i]"
                            inset
                            :label="i"
                        ></v-switch>
                    </v-sheet>
                    <!-- ------------------ -->
                    <v-autocomplete
                        v-if="sch.relation && relationOption[sch.field]"
                        v-model="body[i]"
                        item-value="id"
                        prepend-icon="mdi-relation-one-to-one"
                        :items="relationData[i]"
                        :item-text="relationOption[sch.field].appgen.display"
                        :label="i"
                        clearable
                    ></v-autocomplete>
                    <!-- ------------------ -->
                    <!-- ------------------ -->
                    <!-- ------------------ -->
                    <!-- ------------------ -->
                    <!-- ------------------ -->
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="success darken-1" text @click="create">
                    CREATE
                    {{ formatted }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
    components: { quillEditor },
    props: ["Model", "defaults", "schema"],
    data() {
        return {
            formatted: null,
            syncs: {},
            menus: {},
            relationOption: {},
            relationData: {},
            body: {},
            fields: null,
        };
    },
    mounted: async function () {
        this.fields = this.$store.state[this.Model].options.fields;

        let fields = this.fields;
        for (let f in fields) {
            if (fields[f].relation) {
                this.relationOption[f] = this.$store.state[
                    fields[f].relation.model
                ].options;

                this.relationData[f] = this.$store.state[
                    fields[f].relation.model
                ].deepData;
            }
        }
    },
    methods: {
        create: async function () {
            this.$store.dispatch("appgen", {
                method: "post",
                model: this.Model,
                body: this.body,
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





