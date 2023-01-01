  <template lang="pug">
v-dialog(width="600")   
  template(v-slot:activator="{ on, attrs }")   
    v-btn(v-bind="attrs" v-on="on" icon small )       
      v-icon(small) mdi-text
  div
    v-card
      v-card-title Logs
      v-divider
      v-card-text(v-for="log in $store.state.logs") {{log.title}} 
        pre {{log.body}}
        v-divider
        
            
</template>

<script>
import lodash from "lodash";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  computed: {},
};
</script>

<style>
</style>