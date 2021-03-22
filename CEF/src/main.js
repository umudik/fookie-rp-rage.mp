import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";


import deletee from './components/appgen/delete.vue'
import edit from './components/appgen/edit.vue'
import kanban from './components/appgen/canban.vue'
import viewer from './components/appgen/appgen-viewer.vue'
import filter from './components/appgen/appgen-filter.vue'
import appgenPost from './components/appgen/appgen-post.vue'
import field from './components/appgen/appgen-field.vue'
import card from './components/appgen/appgen-card.vue'
import chartmodelstatus from './components/dashboard/chart-model-status.vue'
import timeline_day_remain from './components/dashboard/timeline-day-remain.vue'


Vue.component('appgen-delete', deletee)
Vue.component('appgen-edit', edit)
Vue.component('appgen-kanban', kanban)
Vue.component('appgen-viewer', viewer)
Vue.component('appgen-post', appgenPost)
Vue.component('appgen-filter', filter)
Vue.component('appgen-field', field)
Vue.component('appgen-card', card)
Vue.component('chart-model-status', chartmodelstatus)
Vue.component('timeline-day-remain', timeline_day_remain)




import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)


import VJsoneditor from 'v-jsoneditor/src/index'

Vue.use(VJsoneditor)

Vue.config.productionTip = false;

const app = new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount("#app");

window.app = app
global.app = app