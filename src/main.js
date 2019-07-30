import Vue from 'vue'
import 'babel-polyfill' //兼容Ie
import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'
import '@/utils/util'

import '@/icons' // icon
import '@/permission' // permission control
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import VueQuillEditor from 'vue-quill-editor'
import { dateStr, formatDateTime } from '@/utils/imUtils/ChatUtils.js';
Vue.prototype.formatDateTime = formatDateTime;
Vue.prototype.dateStr = dateStr;

Vue.use(VueQuillEditor);

Vue.use(ElementUI);



Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
