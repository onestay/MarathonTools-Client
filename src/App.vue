<template>
	<div>
		<b-loading
			:active="loading"
			:can-cancel="false"
			v-if="loading" />
		<router-view
			v-else
			:data="data" />
	</div>
</template>

<script>
import Vue from 'vue';
import Buefy from 'buefy';
import moment from 'moment';
import 'moment-duration-format';
import { setTimeout } from 'timers';

Vue.use(Buefy);

export default {
	data() {
		return {
			loading: true,
			ws: WebSocket,
			data: {
				currentRun: {},
				nextRun: {},
				prevRun: {},
				runs: {},
				runIndex: 0,
				timer: {
					state: 0,
					time: 1.0,
					formatted: '00:00',
					ms: 0,
				},
				twitchViewers: -1,
				donationInfo: {
					amountOld: -1,
					amountNew: 0,
					latestDifference: 0,
				},
				checklistItems: {},
			},
		};
	},
	created() {
		this.createWSConn();
	},
	methods: {
		createWSConn() {
			this.ws = new WebSocket(`ws://${window.location.hostname}:3000/ws`);

			this.ws.onmessage = ((event) => {
				const d = JSON.parse(event.data);
				if (d.dataType === 'initalData') {
					this.data.currentRun = d.currentRun;
					this.data.nextRun = d.nextRun;
					this.data.prevRun = d.prevRun;
					this.data.runs = d.runs;
					this.data.runIndex = d.runIndex;
					this.data.timer.state = d.timerState;
					this.data.checklistItems = d.checklistItems;
					this.loading = false;
				} else if (d.dataType === 'runUpdate') {
					this.data.currentRun = d.currentRun;
					this.data.nextRun = d.nextRun;
					this.data.prevRun = d.prevRun;
					this.data.runs = d.runs;
					this.data.runIndex = d.runIndex;
				} else if (d.dataType === 'stateUpdate') {
					this.data.timer.state = d.state;
				} else if (d.dataType === 'runsOnlyUpdate') {
					this.data.runs = d.runs;
				} else if (d.dataType === 'runCurrentUpdate') {
					this.data.currentRun = d.currentRun;
					this.data.nextRun = d.nextRun;
					this.data.prevRun = d.prevRun;
					this.data.runIndex = d.runIndex;
				} else if (d.dataType === 'timeUpdate') {
					this.data.timer.time = d.t;
					if (d.t >= 3600) {
						this.data.timer.formatted = moment.duration(d.t, 'seconds').format('h:mm:ss', { trim: 'false' });
					} else {
						this.data.timer.formatted = moment.duration(d.t, 'seconds').format('mm:ss', { trim: 'false' });
					}
					this.data.timer.ms = moment.duration(d.t, 'seconds').format('S');
				} else if (d.dataType === 'error') {
					this.$toast.open({
						duration: 5000,
						message: d.error,
						position: 'is-bottom',
						type: 'is-danger',
					});
				} else if (d.dataType === 'twitchViewerUpdate') {
					this.data.twitchViewers = d.viewers;
				} else if (d.dataType === 'donationUpdate') {
					this.data.donationInfo.amountOld = d.old;
					this.data.donationInfo.amountNew = d.new;
					this.data.donationInfo.latestDifference = d.difference;
				}
			});

			this.ws.onopen = (() => {
				this.$http.get('donations/total/update/start')
					.catch(() => console.log('donations updates already running'));

				this.$toast.open({
					type: 'is-light',
					message: 'Websocket connection created.',
					position: 'is-bottom',
				});
			});

			this.ws.onerror = (() => {
				this.$toast.open({
					type: 'is-danger',
					message: 'Couldn\'t connect to Websocket or the connection was unexpectedly closed. Check if the backend is running. Reconnecting in 10 seconds',
					position: 'is-bottom',
					duration: 5000,
				});
			});

			this.ws.onclose = (() => {
				setTimeout(this.createWSConn, 5000);
			});
		},
	},
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

