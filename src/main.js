import Vue from 'vue';
import App from './App.vue';
import ElementUI from 'element-ui';

import permission from './directive/permission';
import router from './router';
import store from './store';
import config from './config';
import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';
import './icons'; // icon
import './assets/styles/element-variables.scss';
import './assets/styles/index.scss';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import './permission';

import globalComp from './components/global';
import globalMixin from '@/mixins/global';

Vue.mixin(globalMixin);
Vue.use(permission);
Vue.use(ElementUI, { size: 'medium', zIndex: 3000 });
Vue.config.productionTip = false;
Vue.prototype.$config = config;
globalComp(Vue);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
