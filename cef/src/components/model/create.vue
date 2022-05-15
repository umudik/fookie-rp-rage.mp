<template lang="pug">
v-card
  v-card-title Create {{model.name}}
  v-card-text
    div(v-for="(field, i) in model.schema")
      v-text-field(
        v-if="field.type == 'object'",
        v-model="body[i]",
        :label="i",
        prepend-icon="mdi-text"
      )
      v-text-field(
        v-if="field.type == 'string'",
        v-model="body[i]",
        :label="i",
        prepend-icon="mdi-text"
      )    
      v-text-field(
        v-if="field.type == 'number' || field.type == 'integer'",
        v-model="body[i]",
        :label="i",
        prepend-icon="mdi-numeric",
        type="number"
      )
      v-switch(
        v-if="field.type == 'boolean'",
        v-model="body[i]",
        :label="i",
        inset=""
      )
      v-autocomplete(
        v-if="typeof field.relation == 'string'",
        v-model="body[i]",
        :item-text="display(relatedModel(field.relation).schema)",
        :items="$store.state.models[field.relation]",
        :label="i",
        :loading="loadings[i]",
        :search-input.sync="search[i]",
        clearable="",
        item-value="_id",
        prepend-icon="mdi-relation-one-to-one"
      )
  v-card-actions
    v-spacer
    v-btn(
      v-if="!selectedId",
      color="success darken-1 ",
      text="",
      @click="create"
    ) Save
    v-btn(v-if="selectedId", color="yellow darken-1", text="", @click="edit") Edit
</template> 

<script>
import deepmerge from "deepmerge";
export default {
  props: ["defaults", "selectedId"],
  data() {
    return {
      search: {},
      loadings: {},
      syncs: {},
      menus: {},
      body: {},
      constBody: {},
      patchBody: {},
    };
  },
  computed: {},

  mounted: async function () {
    let vue = this;
    if (this.selectedId) {
      this.body = vue.model.pool.find((m) => m._id == this.selectedId);
      console.log(this.body);
    }
    if (typeof this.defaults == "object") {
      this.body = deepmerge(this.body, this.defaults);
    }
    this.constBody = JSON.parse(JSON.stringify(this.body));
  },
  methods: {
    create: async function () {
      let vue = this;
      for (let key of Object.keys(vue.body)) {
        if (
          ["integer", "number", "float"].includes(vue.model.schema[key].type)
        ) {
          vue.body[key] = parseInt(vue.body[key]);
        }
        if (vue.model.schema[key].type == "object") {
          vue.body[key] = JSON.parse(vue.body[key]);
        }
      }
      console.log(vue.body);
      await this.$store.dispatch("run", {
        model: vue.model.name,
        method: "create",
        body: JSON.parse(JSON.stringify(vue.body)),
      });
    },
    edit: async function () {
      let body = this.patchBody;
      let model = vue.model.name;
      let id = this.selectedId;
      for (let key of Object.keys(body)) {
        if (
          ["integer", "number", "float"].includes(vue.model.schema[key].type)
        ) {
          body[key] = parseInt(body[key]);
        }
      }
      await this.$store.dispatch("api", {
        method: "update",
        model,
        body,
        query: {
          filter: {
            id,
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
            JSON.stringify(this.constBody[key]) != JSON.stringify(body[key])
          ) {
            this.patchBody[key] = body[key];
          } else {
            delete this.patchBody[key];
          }
        }
      },
    },
  },
  search: {
    deep: true,
    handler(newVal, oldVal) {
      let keys = Object.keys(newVal);
      for (let key of keys) {
        if (newVal[key] != oldVal[key]) {
          console.info(key);
        }
      }
    },
  },
};
</script>
<style>
.card-action {
  flex-direction: row-reverse;
}
</style>