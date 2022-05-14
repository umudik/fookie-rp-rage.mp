<template lang="pug">
  v-card(elevation="0")
    span(class="tw-text-3xl") {{model.name}}
    v-divider
    v-card-text database: 
      span(class="tw-font-bold") {{model.database}}
    v-card-text 
      span(class="tw-mr-2") mixin:
      v-chip(v-for="(mixin) of model.mixin" small dark class="tw-mx-1") {{mixin}}
    span(class="tw-text-3xl") Schema
    v-divider
    v-card-text             
      div(class="tw-flex tw-gap-4 tw-grid tw-grid-cols-3")  
        v-card( v-for="(field,key) of model.schema" outlined )
          v-card-text(class="tw-font-bold") {{key}}
          v-divider
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") type 
            v-spacer
            span(class="tw-font-bold") {{field.type}}
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") required 
            v-spacer
            v-chip( small :color="field.required ? '#2E7D32' : '#DD2C00' " dark) {{ field.required || "false"}}
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") unique 
            v-spacer
            v-chip( small :color="field.unique ? '#2E7D32' : '#DD2C00' " dark) {{ field.unique || "false"}}
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") default 
            v-spacer
            div(class="tw-font-bold") {{field.default}}
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") write 
            v-spacer
            div
              v-chip(v-for="role of field.write" small dark) {{role}}
          v-card-text(class="tw-flex")                 
            span(class="tw-italic") read 
            v-spacer
            div
              v-chip(v-for="role of field.read" small dark) {{role}}   
          v-card-text(v-for="key of optional(field)" class="tw-flex")                 
            span(class="tw-italic") {{key}} 
            v-spacer
            span(class="tw-font-bold") {{field[key]}}    
    span(class="tw-text-3xl") Lifecycle            
    v-divider
    v-card-text
      div( class="tw-flex tw-grid tw-grid-cols-3 tw-gap-4")
        v-card(v-for="obj,method of model.lifecycle" outlined )
          v-card-text 
            span(class="tw-font-bold") {{method}}
          v-divider                   
          v-card-text(v-for="arr of ['preRule','modify','rule','filter','effect']") 
            div(class="tw-italic") {{arr}}
            v-chip(class="tw-m-1" v-for="item of obj[arr]" small dark) {{item}}
    span(class="tw-text-3xl") Role            
    v-divider
    v-card-text
      div( class="tw-flex tw-grid tw-grid-cols-2 tw-gap-4")
        v-card(v-for="obj,method of model.lifecycle" outlined )
          v-card-text 
            span(class="tw-font-bold") {{method}}
          v-divider                   
          v-card-text
          v-timeline(v-model="step" dense)
              v-timeline-item(v-for="role,i of obj.role" :step="i"  icon="mdi-chevron-down" color="grey")
                v-card(width="350")
                  v-card-text 
                    span(class="tw-font-bold") {{role}}
                  v-divider
                  v-card-text(v-if="obj.accept")
                    div Accept
                    v-chip(v-for="item of obj.accept[role]" small dark ) {{item}}
                  v-card-text(v-if="obj.reject ")
                    div Reject
                    v-chip(v-for="item of obj.reject[role]" small dark ) {{item }}
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {
      step: 0,
      tab: 0,
      token: "admin",
    };
  },
  methods: {
    optional(field) {
      return lodash.intersection(lodash.keys(field), [
        "min",
        "max",
        "equal",
        "notEqual",
        "includes",
        "maxSize",
        "minSize",
      ]);
    },
  },
  computed: {},
  mounted: async function () {},
};
</script>
