import Vue from 'vue';
import Router from 'vue-router';

// components
import Dashboard from './components/Dashboard/Dashboard.vue';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/dashboard',
		},
		{
			path: '/dashboard',
			component: Dashboard,
		},
	],
});
