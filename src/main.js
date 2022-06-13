import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { router } from './router.js'
import i18n from './lang'
import vuetify from './plugins/vuetify'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(Router)
Vue.use(VueI18n)

new Vue({
  vuetify,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
