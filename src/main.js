import Vue from 'vue';
import 'material-design-icons/iconfont/material-icons.css';
import App from './App.vue';
import router from './router';


// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
