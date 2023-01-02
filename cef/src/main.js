import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './main.css'
Vue.config.productionTip = false

// COMPONENTS

import f_menu from './components/menus/f_menu.vue'
import f_log from './components/menus/f_log.vue'


import f_inventory from './components/inventory/inventory.vue'

//MENUS 

import player_generate from './components/menus/player_generate.vue'

Vue.component("f-log", f_log)
Vue.component("f-player-generate", player_generate)
Vue.component("f-menu", f_menu)
Vue.component("f-inventory", f_inventory)
// MIXIN 
import fm from "./mixin/fm.vue";
Vue.mixin(fm)

const app = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

window.app = app
