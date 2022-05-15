<template lang="pug">
div
  v-card(:loading="$store.state.loadings.includes(model.name)")
    v-card-text
      v-simple-table() 
        template(v-slot:default)
          thead
            tr
              th(v-for="key in schema_keys") {{ key }}
          tbody
            tr(
              v-for="object in models[model.name]",
            )
              td(v-for="key_1 in schema_keys")
                f-model-field(:entity="object" :field="model.schema[key_1]" :k="key_1") {{ object[key_1] }}
  v-dialog(width="600")   
    template(v-slot:activator="{ on, attrs }")   
      v-btn(v-bind="attrs" v-on="on" fab fixed right dark bottom color="green")       
        v-icon mdi-plus
    f-model-create  
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    object_keys(object) {},
  },
  computed: {
    schema_keys() {
      return lodash.keys(this.model.schema);
    },
  },
};
</script>

<style>
</style>