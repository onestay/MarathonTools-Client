import Vue from 'vue';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.min.css';
import App from './App.vue';
import router from './router';

Vue.prototype.$http = axios;

Vue.http.options.root = `http://${window.location.hostname}:3000`;
// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
