/**
 * @description: Description
 * @author: lizlong<94648929@qq.com>
 * @since: 2019-11-29 09:17:39
 * @LastAuthor: lizlong
 * @lastTime: 2019-11-29 10:36:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from "@/router/index.js";
import {
  store
} from "@/store/index.js";
import './plugins/element/element.js' // 引入饿了么UI
import '@/utils/permissions' //全局路由钩子
import '@/directive/index' //自定义指令集
import global from "@/utils/global" //全局方法
import Icon from "vue2-svg-icon/Icon.vue" // svg

Vue.config.productionTip = false
Vue.use(global);
Vue.component("icon", Icon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
