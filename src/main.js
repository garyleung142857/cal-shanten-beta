import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { router } from './router.js'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(Router)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
