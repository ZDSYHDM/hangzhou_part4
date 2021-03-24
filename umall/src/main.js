import Vue from 'vue'
import App from './App'
import router from './router'

import './assets/css/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import './filters/index.js'
import './components/index.js'

import store from './store/index.js'

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
