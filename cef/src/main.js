import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './main.css'
Vue.config.productionTip = false

// COMPONENTS
import f_model_info from './components/model/info.vue'
import f_model_field from './components/model/field.vue'
import f_model_list from './components/model/list.vue'
import f_model_create from './components/model/create.vue'
import f_menu from './components/menus/f_menu.vue'
import f_log from './components/menus/f_log.vue'

//MENUS 

import player_generate from './components/menus/player_generate.vue'

Vue.component("f-model-info", f_model_info)
Vue.component("f-model-list", f_model_list)
Vue.component("f-model-create", f_model_create)
Vue.component("f-model-field", f_model_field)
Vue.component("f-log", f_log)

Vue.component("f-player-generate", player_generate)

Vue.component("f-menu", f_menu)
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
