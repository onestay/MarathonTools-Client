import Vue from 'vue';
import Router from 'vue-router';

// components
import Dashboard from './components/Dashboard/Dashboard.vue';
import Config from './components/Dashboard/Config.vue';

import ConfigGeneral from './components/Dashboard/ConfigComponents/General.vue';
import ConfigRuns from './components/Dashboard/ConfigComponents/Runs.vue';
import ConfigSocial from './components/Dashboard/ConfigComponents/Social.vue';

import HostDB from './components/HostDashboard/HostDashboard.vue';


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
		{
			path: '/dashboard/config',
			component: Config,
			children: [
				{
					path: 'general',
					component: ConfigGeneral,
				},
				{
					path: 'runs',
					component: ConfigRuns,
				},
				{
					path: 'social',
					component: ConfigSocial,
					alias: ['/dashboard/config/social/twitch', '/dashboard/config/social/twitter'],
				},
			],
		},
		{
			path: '/host',
			component: HostDB,
		},
	],
});
