import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import filters from './filters';
import './mock/index'
import './assets/js/ajax'  // 引入ajax
import 'element-ui/lib/theme-chalk/index.css'
import './assets/sass/_reset.scss';
import './assets/sass/_common.scss';

import VueQuillEditor from 'vue-quill-editor'
Vue.use(VueQuillEditor);
Vue.use(ElementUI)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
