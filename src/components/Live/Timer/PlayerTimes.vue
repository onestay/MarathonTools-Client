<template>
	<div>{{ output }}</div>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';

export default {
	props: {
		data: {
			type: Object,
			default() {
				return { error: 'ERROR' };
			},
		},
	},
	computed: {
		output() {
			if (this.data.currentRun.players.length === 1) {
				return '';
			} else if (this.$route.params.id && parseInt(this.$route.params.id, 10) >= this.data.currentRun.players.length) {
				return '';
			}
			const p = this.data.currentRun.players[this.$route.params.id];

			// TODO: display position of player
			if (p.timer.finished) {
				return p.timer.time >= 3600 ? moment.duration(p.timer.time, 'seconds').format('h:mm:ss', { trim: 'false' })
					: moment.duration(p.timer.time, 'seconds').format('mm:ss', { trim: 'false' });
			}
			return '';
		},
	},
};
</script>

<style scoped>
html {
	background-color: #00ff00;
}
body {
	color: white !important;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 50px;
}
</style>
