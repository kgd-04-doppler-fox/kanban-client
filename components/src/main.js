import Vue from 'vue'
import App from './App.vue'
import { LoaderPlugin } from 'vue-google-login';

new Vue({
    render: h => h(App),
  }).$mount('#app');

Vue.use(LoaderPlugin, {
    client_id: "419148580155-l4a8am6ev1u521kdp14vjnuodvalob6m.apps.googleusercontent.com"
});