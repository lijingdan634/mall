import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
Vue.config.productionTip = false

// Vue实例可以作为事件总线
Vue.prototype.$bus = new Vue()

//解决移动端的300ms延迟
FastClick.attach(document.body)

//安装toast插件
Vue.use(toast)

//图片懒加载
Vue.use(VueLazyload,{
  loading: require('@/assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
