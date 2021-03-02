<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="600px">
            <template v-slot:activator="{ on, attrs }">
                <v-avatar v-bind="attrs" v-on="on" color="blue" size="36">
                    <v-icon dense color="white">mdi-pencil</v-icon>
                </v-avatar>
            </template>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit {{ Model }}</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row
                            v-for="(field, i) in $store.state[Model].options
                                .fields"
                            :key="i"
                        >
                            <!-- ------------------ -->
                            <v-text-field
                                prepend-icon="mdi-text"
                                v-if="field.appgen.input == 'text'"
                                :label="i"
                                v-model="body[i]"
                            ></v-text-field>

                            <!-- ------------------ -->
                            <v-text-field
                                v-if="field.appgen.input == 'password'"
                                :label="i"
                                v-model="body[i]"
                                prepend-icon="mdi-lock"
                                :append-icon="
                                    menus[i] ? 'mdi-eye' : 'mdi-eye-off'
                                "
                                type="password"
                                hint="At least 8 characters"
                                @click:append="menus[i] = !menus[i]"
                            ></v-text-field>

                            <!-- ------------------ -->
                            <!-- ------------------ -->
                            <v-text-field
                                v-if="field.appgen.input == 'number'"
                                :label="i"
                                v-model="body[i]"
                                prepend-icon="mdi-numeric"
                                type="number"
                            ></v-text-field>

                            <!-- ------------------ -->
                            <v-menu
                                v-if="field.appgen.input == 'time'"
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

                            <v-color-picker
                                v-if="field.appgen.input == 'color'"
                                dot-size="20"
                                mode="hexa"
                                show-swatches
                                swatches-max-height="100"
                                v-model="body[i]"
                            ></v-color-picker>

                            <!-- ------------------ -->

                            <v-menu
                                v-if="field.appgen.input == 'date'"
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

                            <div v-if="field.appgen.input == 'rich'">
                                <quill-editor
                                    ref="myQuillEditor"
                                    v-model="body[i]"
                                    @blur="onEditorBlur($event)"
                                    @focus="onEditorFocus($event)"
                                    @ready="onEditorReady($event)"
                                />
                            </div>
                            <!-- ------------------ -->
                            {{ i }}
                            <v-jsoneditor
                                v-if="field.appgen.input == 'json'"
                                v-model="body[i]"
                                :plus="false"
                                height="400px"
                                :options="{ mode: 'code' }"
                            />
                            <!-- ------------------ -->
                            <v-sheet class="">
                                <v-switch
                                    v-if="field.appgen.input == 'boolean'"
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
                                :items="
                                    $store.state[field.relation.model].deepData
                                "
                                :item-text="
                                    $store.state[field.relation.model].options
                                        .appgen.display
                                "
                                :label="i"
                                clearable
                            ></v-autocomplete>

                            <!-- ------------------ -->
                            <!-- ------------------ -->
                            <!-- ------------------ -->
                            <!-- ------------------ -->
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue" text @click="edit"> EDIT </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
    components: { quillEditor },
    props: ["Model", "id"],
    data() {
        return {
            syncs: {},
            menus: {},
            dialog: false,
            body: {},
        };
    },
    created: async function () {
        this.body = await this.$store.dispatch("appgen", {
            method: "get",
            model: this.Model,
            query: {
                where: {
                    id: this.id,
                },
            },
        });
    },
    methods: {
        edit: async function () {
            await this.$store.dispatch("appgen", {
                model: this.Model,
                method: "patch",
                body: this.body,
                query: {
                    where: {
                        id: {
                            $eq: this.id,
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





