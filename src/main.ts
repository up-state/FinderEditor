import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'overlayscrollbars/css/OverlayScrollbars.css';
import VueCookies from "vue-cookies-ts"

Vue.config.productionTip = false;
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
