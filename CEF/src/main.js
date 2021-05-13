import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";


import deletee from './components/fookie/fookie-delete.vue'
import viewer from './components/fookie/fookie-viewer.vue'
import filter from './components/fookie/fookie-filter.vue'
import fookiePost from './components/fookie/fookie-post.vue'
import field from './components/fookie/fookie-field.vue'
import card from './components/fookie/fookie-card.vue'
import chartmodelstatus from './components/dashboard/chart-model-status.vue'
import timeline_day_remain from './components/dashboard/timeline-day-remain.vue'
import inventory from './components/game/inventory/inventory.vue'
import item from './components/game/inventory/item.vue'


Vue.component('fookie-delete', deletee)
Vue.component('fookie-viewer', viewer)
Vue.component('fookie-post', fookiePost)
Vue.component('fookie-filter', filter)
Vue.component('fookie-field', field)
Vue.component('fookie-card', card)
Vue.component('chart-model-status', chartmodelstatus)
Vue.component('timeline-day-remain', timeline_day_remain)
Vue.component('game-inventory', inventory)
Vue.component('game-item', item)




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