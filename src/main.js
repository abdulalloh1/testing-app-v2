import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueIzitoast from "vue-izitoast";
import 'izitoast/dist/css/iziToast.min.css';

Vue.config.productionTip = false
Vue.use(VueIzitoast, {
  position: 'bottomCenter'
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
