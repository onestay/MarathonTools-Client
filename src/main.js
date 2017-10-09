import Vue from 'vue';
import VueResource from 'vue-resource';
import 'material-design-icons/iconfont/material-icons.css';
import App from './App.vue';
import router from './router';

Vue.use(VueResource);

// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
