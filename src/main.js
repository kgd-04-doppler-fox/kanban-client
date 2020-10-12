require ('dotenv').config()
import Vue from 'vue';
import App from './App.vue';
import { LoaderPlugin } from 'vue-google-login';


new Vue({
  render: h => h(App),
  
}).$mount('#app');

new Vue.use(LoaderPlugin, {
  client_id: CLIENT_ID
});