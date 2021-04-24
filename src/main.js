import Vue from 'vue';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.min.css';
import App from './App.vue';
import router from './router';

const axiosInstance = axios.create({
	baseURL: 'https://mt.onestay.moe/',
});

Vue.prototype.$http = axiosInstance;

// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
