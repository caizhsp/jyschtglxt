// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 引入element-ui框架
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)

// 引入store仓库
import store from "./store"

// 引入重置样式
import "./assets/css/reset.css"

// 引入组件
import vCom from "./components"
for (let i in vCom) {
  Vue.component(i, vCom[i])
}

// 将图片路径前缀挂载到原型链上，方便复用
Vue.prototype.$imgUrl = "http://localhost:3000"


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
