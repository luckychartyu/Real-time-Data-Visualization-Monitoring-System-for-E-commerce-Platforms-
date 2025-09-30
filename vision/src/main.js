import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/global.less'
import axios from 'axios'
import SocketService from '@/utils/socket_service'
SocketService.Instance.connect()
Vue.prototype.$socket = SocketService.Instance

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/'
Vue.prototype.$http = axios
// 将全局echarts对象挂载在vue原型对象上
Vue.prototype.$echarts = window.echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
