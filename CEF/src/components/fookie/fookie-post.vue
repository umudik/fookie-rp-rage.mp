
<template>
    <v-dialog v-model="dialog" elevation="3" width="700">
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                v-if="!selectedId"
                v-bind="attrs"
                v-on="on"
                color="info"
                dark
            >
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn
                v-if="selectedId"
                v-bind="attrs"
                v-on="on"
                color="yellow darken-1"
                dark
            >
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title> Create {{ model.name }} </v-card-title>
            <v-card-text v-for="(field, i) in model.schema" :key="field">
                <v-text-field
                    v-if="field.input === 'text'"
                    v-model="body[i]"
                    :label="i"
                    prepend-icon="mdi-text"
                ></v-text-field>

                <v-text-field
                    v-if="field.input === 'password'"
                    v-model="body[i]"
                    :append-icon="menus[i] ? 'mdi-eye' : 'mdi-eye-off'"
                    :label="i"
                    hint="At least 8 characters"
                    prepend-icon="mdi-lock"
                    type="password"
                    @click:append="menus[i] = !menus[i]"
                ></v-text-field>

                <v-text-field
                    v-if="field.input === 'number'"
                    v-model="body[i]"
                    :label="i"
                    prepend-icon="mdi-numeric"
                    type="number"
                ></v-text-field>

                <v-menu
                    v-if="field.input === 'time'"
                    v-model="menus[i]"
                    :nudge-right="40"
                    :return-value.sync="syncs[i]"
                    max-width="290px"
                    min-width="290px"
                    offset-y
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="body[i]"
                            v-bind="attrs"
                            v-on="on"
                            :label="i"
                            prepend-icon="mdi-clock-time-four-outline"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-time-picker
                        v-if="menus[i]"
                        v-model="body[i]"
                        format="24hr"
                        full-width
                        @click:minute="$refs.menu.save(time)"
                    ></v-time-picker>
                </v-menu>
                <v-menu
                    v-if="field.input === 'color'"
                    :return-value.sync="syncs[i]"
                    min-width="auto"
                    offset-y
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="body[i]"
                            v-bind="attrs"
                            v-on="on"
                            :background-color="body[i] ? body[i].hexa : ''"
                            :label="i"
                            prepend-icon="mdi-calendar"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-color-picker
                        v-model="body[i]"
                        dot-size="20"
                        mode="hexa"
                    ></v-color-picker>
                </v-menu>
                <v-menu
                    v-if="field.input === 'date'"
                    v-model="menus[i]"
                    :return-value.sync="syncs[i]"
                    min-width="auto"
                    offset-y
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="body[i]"
                            v-bind="attrs"
                            v-on="on"
                            :label="i"
                            prepend-icon="mdi-calendar"
                            readonly
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="body[i]" scrollable></v-date-picker>
                </v-menu>
                <div v-if="field.input === 'rich'">
                    <quill-editor ref="myQuillEditor" v-model="body[i]" />
                </div>

                <div v-if="field.input === 'json'">{{ i }}</div>
                <v-jsoneditor
                    v-if="field.input === 'json'"
                    v-model="body[i]"
                    :options="{ mode: 'code' }"
                    :plus="false"
                    height="400px"
                />

                <v-switch
                    v-if="field.input === 'boolean'"
                    v-model="body[i]"
                    :label="i"
                    inset
                ></v-switch>

                <v-autocomplete
                    v-if="typeof field.relation == 'string'"
                    v-model="body[i]"
                    :item-text="relationModel(field.relation).display"
                    :items="relationModel(field.relation).pool"
                    :label="i"
                    clearable
                    item-value="id"
                    prepend-icon="mdi-relation-one-to-one"
                ></v-autocomplete>
                <v-text-field
                    v-if="field.input === 'phone'"
                    v-mask="'+90 (###) ###-####'"
                    v-model="body[i]"
                    :label="i"
                    prepend-icon="mdi-phone"
                ></v-text-field>
            </v-card-text>
            <v-card-actions class="card-action">
                <v-btn
                    v-if="!selectedId"
                    color="success darken-1 "
                    text
                    @click="create"
                    >Kaydet</v-btn
                >
                <v-btn
                    v-if="selectedId"
                    color="yellow darken-1"
                    text
                    @click="edit"
                    >Güncelle</v-btn
                >
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
    props: ["defaults", "model", "selectedId"],
    data() {
        return {
            syncs: {},
            menus: {},
            body: {},
            constBody: {},
            patchBody: {},
            dialog: false,
        };
    },
    computed: {},
    mounted: async function () {
        if (this.selectedId) {
            this.body = this.model.pool.find((m) => m._id === this.selectedId);
            this.constBody = JSON.parse(JSON.stringify(this.body));
        }
    },
    methods: {
        relationModel(model) {
            return this.$store.state[model];
        },
        create: async function () {
            this.dialog = false;

            let body = this.body;
            let model = this.model.name;

            // string to number parser
            for (let key of Object.keys(body))
                if (
                    ["integer", "number", "float"].includes(
                        this.model.schema[key].type
                    )
                )
                    body[key] = parseInt(body[key]);
            console.log(body);
            await this.$store.dispatch("api", {
                method: "post",
                model,
                body,
            });
        },
        edit: async function () {
            this.dialog = false;
            let body = this.patchBody;
            let model = this.model.name;
            let _id = this.selectedId;

            // string to number parser
            for (let key of Object.keys(body))
                if (
                    ["integer", "number", "float"].includes(
                        this.model.schema[key].type
                    )
                )
                    body[key] = parseInt(body[key]);

            await this.$store.dispatch("api", {
                method: "patch",
                model,
                body,
                query: {
                    where: {
                        _id,
                    },
                },
            });
        },
    },
    watch: {
        body: {
            deep: true,
            handler(body) {
                let keys = Object.keys(this.body);
                for (let key of keys) {
                    if (
                        JSON.stringify(this.constBody[key]) !=
                        JSON.stringify(body[key])
                    ) {
                        this.patchBody[key] = body[key];
                    } else {
                        delete this.patchBody[key];
                    }
                }
            },
        },
    },
};
</script>

<style lang='scss' scoped>
.ql-editor {
    min-height: 300px;
}
.card-action {
    flex-direction: row-reverse;
}
</style>
