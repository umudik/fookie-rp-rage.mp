<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';

export default {
    components: { quillEditor },
    props: ['defaults', 'model', 'selectedId'],
    data() {
        return {
            syncs: {},
            menus: {},
            body: {},
            constBody :{},
            patchBody: {},
            dialog: false,
        };
    },
    computed: {
        fields() {
            return this.$store.state[this.model].schema;
        },
    },
    mounted: async function() {
        if (this.selectedId) {
            this.body = this.$store.state[this.model].pool.find((m) => m.id === this.selectedId);
            this.constBody = JSON.parse(JSON.stringify(this.body))
        }

    },
    methods: {
        keyEvent(e) {
            if (e.key === 'Enter') {
                this.selectedId ? this.edit() : this.create();
            }
        },
        relationModel(model) {
            return this.$store.state[model];
        },
        create: async function() {
            this.dialog = false;
            let data = JSON.parse(JSON.stringify(this.body));
            if (data.phone) data.phone = data.phone.replaceAll(/[ ()-]/g, '');
            await this.$store.dispatch('api', {
                method: 'post',
                model: this.model,
                body: data,
            });
        },
        edit: async function() {
            this.dialog = false;
            let data = this.patchBody;
            if (data.phone) data.phone = data.phone.replaceAll(/[ ()-]/g, '');
            await this.$store.dispatch('api', {
                method: 'patch',
                model: this.model + '/' + this.body.id,
                body: data,
            });
        },
    },
    watch: {
        body: {
            deep: true,
            handler(body) {
                let keys = Object.keys(this.body);
                for (let key of keys) {
                    if (JSON.stringify(this.constBody[key]) != JSON.stringify(body[key])) {
                        this.patchBody[key] = body[key];
                    }else{
                        delete this.patchBody[key]
                    }
                }
            },
        },
    },
};
</script>

<template>
    <v-dialog v-model='dialog' elevation='3' width='700' @keydown='keyEvent'>
        <template v-slot:activator='{ on, attrs }'>
            <v-btn v-if='!selectedId' v-bind='attrs' v-on='on' color='info' dark large>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
            <v-btn v-if='selectedId' v-bind='attrs' v-on='on' color='yellow darken-1' dark small>
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
        </template>
        <v-card>
            <v-card-title />
            <v-card-text v-for='(field, i) in fields' :key='i'>
                <v-row v-if='field[$store.state.self.user.type].write'>
                    <v-text-field
                            v-if="field.input === 'text'"
                            v-model='body[i]'
                            :label='field.label'
                            prepend-icon='mdi-text'
                    ></v-text-field>
                    <v-text-field
                            v-if="field.input === 'password'"
                            v-model='body[i]'
                            :append-icon="menus[i] ? 'mdi-eye' : 'mdi-eye-off'"
                            :label='field.label'
                            hint='At least 8 characters'
                            prepend-icon='mdi-lock'
                            type='password'
                            @click:append='menus[i] = !menus[i]'
                    ></v-text-field>
                    <v-text-field
                            v-if="field.input === 'number'"
                            v-model='body[i]'
                            :label='field.label'
                            prepend-icon='mdi-numeric'
                            type='number'
                    ></v-text-field>
                    <v-menu
                            v-if="field.input === 'time'"
                            v-model='menus[i]'
                            :nudge-right='40'
                            :return-value.sync='syncs[i]'
                            max-width='290px'
                            min-width='290px'
                            offset-y
                            transition='scale-transition'
                    >
                        <template v-slot:activator='{ on, attrs }'>
                            <v-text-field
                                    v-model='body[i]'
                                    v-bind='attrs'
                                    v-on='on'
                                    :label='field.label'
                                    prepend-icon='mdi-clock-time-four-outline'
                                    readonly
                            ></v-text-field>
                        </template>
                        <v-time-picker
                                v-if='menus[i]'
                                v-model='body[i]'
                                format='24hr'
                                full-width
                                @click:minute='$refs.menu.save(time)'
                        ></v-time-picker>
                    </v-menu>
                    <v-menu
                            v-if="field.input === 'color'"
                            :return-value.sync='syncs[i]'
                            min-width='auto'
                            offset-y
                            transition='scale-transition'
                    >
                        <template v-slot:activator='{ on, attrs }'>
                            <v-text-field
                                    v-model='body[i]'
                                    v-bind='attrs'
                                    v-on='on'
                                    :background-color="body[i] ? body[i].hexa : ''"
                                    :label='field.label'
                                    prepend-icon='mdi-calendar'
                                    readonly
                            ></v-text-field>
                        </template>
                        <v-color-picker v-model='body[i]' dot-size='20' mode='hexa'></v-color-picker>
                    </v-menu>
                    <v-menu
                            v-if="field.input === 'date'"
                            v-model='menus[i]'
                            :return-value.sync='syncs[i]'
                            min-width='auto'
                            offset-y
                            transition='scale-transition'
                    >
                        <template v-slot:activator='{ on, attrs }'>
                            <v-text-field
                                    v-model='body[i]'
                                    v-bind='attrs'
                                    v-on='on'
                                    :label='field.label'
                                    prepend-icon='mdi-calendar'
                                    readonly
                            ></v-text-field>
                        </template>
                        <v-date-picker v-model='body[i]' scrollable></v-date-picker>
                    </v-menu>
                    <div v-if="field.input === 'rich'">
                        <quill-editor ref='myQuillEditor' v-model='body[i]' />
                    </div>
                    <v-jsoneditor
                            v-if="field.input === 'json'"
                            v-model='body[i]'
                            :options="{ mode: 'code' }"
                            :plus='false'
                            height='400px'
                    />
                    <v-sheet class>
                        <v-switch
                                v-if="field.input === 'boolean'"
                                v-model='body[i]'
                                :label='field.label'
                                inset
                        ></v-switch>
                    </v-sheet>
                    <v-autocomplete
                            v-if="field.input === 'relation'"
                            v-model='body[i]'
                            :item-text='relationModel(field.relation.model).display'
                            :items='relationModel(field.relation.model).pool'
                            :label='
                            relationModel(field.relation.model).schema[relationModel(field.relation.model).display]
                                .label
                        '
                            clearable
                            item-value='id'
                            prepend-icon='mdi-relation-one-to-one'
                    ></v-autocomplete>
                    <v-text-field
                            v-if="field.input === 'phone'"
                            v-mask="'+90 (###) ###-####'"
                            v-model='body[i]'
                            :label='field.label'
                            prepend-icon='mdi-phone'
                    ></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn v-if='!selectedId' color='success darken-1' text @click='create'>Kaydet</v-btn>
                <v-btn v-if='selectedId' color='yellow darken-1' text @click='edit'>Güncelle</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<style lang='scss' scoped>
.ql-editor {
    min-height: 300px;
}
</style>
