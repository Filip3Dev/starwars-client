import Vue from 'vue';
import './plugins/axios';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import 'buefy/dist/buefy.css';

Vue.use(Buefy);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
