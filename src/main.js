import Vue from 'vue';
import VueResource from 'vue-resource';
import 'mdi/css/materialdesignicons.min.css';
import App from './App.vue';
import router from './router';

Vue.use(VueResource);

Vue.http.options.root = `http://${window.location.hostname}:3000`;
// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
