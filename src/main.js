import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'lib-flexible'
import '@/assets/scss/index.scss'
import '@/utils/vant'

//Fastclick移除移动端点击延迟
import FastClick from 'fastclick'
FastClick.attach(document.body)

//vue-scroller刷新组件
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
