import Vue from 'vue';
import Router from 'vue-router';

// components
import Dashboard from './components/Dashboard/Dashboard.vue';
import Config from './components/Dashboard/Config.vue';

import ConfigGeneral from './components/Dashboard/ConfigComponents/General.vue';
import ConfigRuns from './components/Dashboard/ConfigComponents/Runs.vue';
import ConfigSocial from './components/Dashboard/ConfigComponents/Social.vue';

import HostDB from './components/HostDashboard/HostDashboard.vue';

import Live from './components/Live/Live.vue';

import LdonationCount from './components/Live/Donations/DonationCount.vue';

import Lruns from './components/Live/Runs/Runs.vue';
import Lplayer from './components/Live/Runs/Player.vue';

import Ltime from './components/Live/Timer/Time.vue';
import LplayerTime from './components/Live/Timer/PlayerTimes.vue';

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
		{
			path: '/live',
			component: Live,
			children: [
				{
					path: 'runs/:type/:part',
					component: Lruns,
				},
				{
					path: 'donations',
					component: LdonationCount,
				},
				{
					path: 'time',
					component: Ltime,
				},
				{
					path: 'time/player/:id',
					component: LplayerTime,
				},
				{
					path: 'player/:id',
					component: Lplayer,
				},
			],
		},
	],
});
