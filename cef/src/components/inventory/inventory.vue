<template lang="pug">
v-row
  v-col(cols="12", sm="3")
    v-card
      v-card-title Inventory
      v-card-subtitle {{ inventory_id }}
      v-card-text 
        v-row.drop 
          v-col.drop_item(
            v-for="(item, index) of inventory_type.slotSize",
            :key="item.id"
          )
            v-menu(offset-x)
              template(v-slot:activator="{ on, attrs }") 
                v-img(
                  v-if="getItem(index)",
                  :src="getItemType(getItem(index).item_type).image",
                  aspect-ratio="1",
                  height="110",
                  width="110",
                  contain
                )
                  v-sheet.d-flex(
                    color="transparent",
                    height="110",
                    width="110",
                    elevation="4",
                    v-bind="attrs",
                    v-on="on"
                  )
                    span.tw-text-xs {{ index + 1 }}
                    v-sheet.mt-auto {{ getItemType(getItem(index).item_type).name }}
                    v-sheet.mt-auto.ml-auto
                      span {{ getItem(index).amount }}x
                v-sheet(
                  v-if="!getItem(index)",
                  height="110",
                  width="110",
                  elevation="1"
                )
              v-list(dense)
                v-list-item(link) Use
                v-list-item(link) Drop
      v-card-text
</template>

<script>
import lodash from "lodash";
export default {
  props: ["inventory_id"],
  data() {
    return {
      inventory: {},
      inventory_type: {},
      items: [],
      item_types: [],
    };
  },
  mounted: async function () {
    const vue = this;
    this.inventory = (
      await vue.$store.dispatch("run", {
        model: "inventory",
        method: "read",
        query: {
          filter: {
            pk: vue.inventory_id,
          },
        },
      })
    ).data[0];

    this.items = (
      await vue.$store.dispatch("run", {
        model: "item",
        method: "read",
        query: {
          filter: {
            inventory: vue.inventory_id,
          },
        },
      })
    ).data;

    this.item_types = (
      await vue.$store.dispatch("run", {
        model: "item_type",
        method: "read",
      })
    ).data;

    this.inventory_type = (
      await vue.$store.dispatch("run", {
        model: "inventory_type",
        method: "read",
        query: {
          filter: {
            pk: vue.inventory.inventory_type,
          },
        },
      })
    ).data[0];
  },
  methods: {
    getItem(index) {
      const vue = this;
      return lodash.find(vue.items, { slot: index });
    },
    getItemType(id) {
      const vue = this;
      return lodash.find(vue.item_types, { id: id });
    },
  },
  computed: {},
};
</script>

<style>
</style>