import Vue from 'vue';
import axios from 'axios';
import '@mdi/font/css/materialdesignicons.min.css';
import App from './App.vue';
import router from './router';

const baseURL = process.env.VUE_APP_NODE_ENV === 'production' ? process.env.VUE_APP_API_URL : 'http://localhost:3000';
const axiosInstance = axios.create({
	baseURL,
});

Vue.prototype.$http = axiosInstance;

// eslint-disable-next-line
new Vue({
	el: '#app',
	render: h => h(App),
	router,
});
