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

Vue.component("f-model-info", f_model_info)
Vue.component("f-model-list", f_model_list)
Vue.component("f-model-create", f_model_create)
Vue.component("f-model-field", f_model_field)


// MIXIN 
import fm from "./mixin/fm.vue";
Vue.mixin(fm)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
