<template>
    <v-card>
        <v-card-title>Create {{ model.name }}</v-card-title>
        <v-card-text>
            <v-row
                v-for="(field, i) in model.schema"
                :key="i"
            >
                <!-- ------------------ -->
                <v-text-field
                    prepend-icon="mdi-text"
                    v-if="field.input == 'text'"
                    :label="i"
                    v-model="body[i]"
                ></v-text-field>

                <!-- ------------------ -->
                <v-text-field
                    v-if="field.input == 'password'"
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
                    v-if="field.input == 'number'"
                    :label="i"
                    v-model="body[i]"
                    prepend-icon="mdi-numeric"
                    type="number"
                ></v-text-field>

                <!-- ------------------ -->
                <v-menu
                    v-if="field.input == 'time'"
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
                    v-if="field.input == 'color'"
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
                    v-if="field.input == 'date'"
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

                <div v-if="field.input == 'rich'">
                    <quill-editor ref="myQuillEditor" v-model="body[i]" />
                </div>
                <!-- ------------------ -->
                <v-jsoneditor
                    v-if="field.input == 'json'"
                    v-model="body[i]"
                    :plus="false"
                    height="400px"
                    :options="{ mode: 'code' }"
                />

                <!-- ------------------ -->
                <v-sheet class="">
                    <v-switch
                        v-if="field.input == 'boolean'"
                        v-model="body[i]"
                        inset
                        :label="i"
                    ></v-switch>
                </v-sheet>
                <!-- ------------------ -->
                <v-autocomplete
                    v-if="field.relation"
                    v-model="body[i]"
                    item-value="id"
                    prepend-icon="mdi-relation-one-to-one"
                    :items="$store.state[field.relation.model].pool"
                    :item-text="
                        $store.state[field.relation.model].display
                    "
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
            </v-btn>
        </v-card-actions>
    </v-card>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
    components: { quillEditor },
    props: ["model", "defaults", "fieldema"],
    data() {
        return {
            syncs: {},
            menus: {},
            relationOption: {},
            relationData: {},
            body: {},
        };
    },
    mounted: async function () {
    
    },
    methods: {
        create: async function () {
            this.$store.dispatch("appgen", {
                method: "post",
                model: this.model,
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





