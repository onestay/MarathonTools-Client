import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/dashboard',
		},
		{
			path: '/dashboard',
			component: () => import(/* webpackChunkName: "dashboard" */ './components/Dashboard/Dashboard.vue'),
		},
		{
			path: '/dashboard/config',
			component: () => import(/* webpackChunkName: "config" */ './components/Dashboard/Config.vue'),
			children: [
				{
					path: 'general',
					component: () => import(/* webpackChunkName: "config" */ './components/Dashboard/ConfigComponents/General.vue'),
				},
				{
					path: 'runs',
					component: () => import(/* webpackChunkName: "config" */ './components/Dashboard/ConfigComponents/Runs.vue'),
				},
				{
					path: 'social',
					component: () => import(/* webpackChunkName: "config" */ './components/Dashboard/ConfigComponents/Social.vue'),
					alias: ['/dashboard/config/social/twitch', '/dashboard/config/social/twitter'],
				},
				{
					path: 'checklist',
					component: () => import(/* webpackChunkName: "config" */ './components/Dashboard/ConfigComponents/Checklist.vue'),
				},
			],
		},
		{
			path: '/host',
			component: () => import(/* webpackChunkName: "host" */ './components/HostDashboard/HostDashboard.vue'),
		},
		{
			path: '/live',
			component: () => import(/* webpackChunkName: "live" */ './components/Live/Live.vue'),
			children: [
				{
					path: 'runs/:type/:part',
					component: () => import(/* webpackChunkName: "live" */ './components/Live/Runs/Runs.vue'),
				},
				{
					path: 'donations',
					component: () => import(/* webpackChunkName: "live" */ './components/Live/Donations/DonationCount.vue'),
				},
				{
					path: 'time',
					component: () => import(/* webpackChunkName: "live" */ './components/Live/Timer/Time.vue'),
				},
				{
					path: 'time/player/:id',
					component: () => import(/* webpackChunkName: "live" */ './components/Live/Timer/PlayerTimes.vue'),
				},
				{
					path: 'player/:id',
					component: () => import(/* webpackChunkName: "live" */ './components/Live/Runs/Player.vue'),
				},
			],
		},
	],
});
