<template>
	<div v-html="output" />
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
	data() {
		return {
			pos: 0,
		};
	},
	computed: {
		output() {
			if (this.data.currentRun.players.length === 1) {
				return '';
			} else if (this.$route.params.id && parseInt(this.$route.params.id, 10) >= this.data.currentRun.players.length) {
				return '';
			}
			const p = this.data.currentRun.players[this.$route.params.id];

			// TODO: eventually move the position stuff to backend since this is super bad code
			if (p.timer.finished) {
				if (this.pos !== 0) {
					return `<div class="time">${p.timer.time >= 3600 ? moment.duration(p.timer.time, 'seconds').format('h:mm:ss', { trim: 'false' })
						: moment.duration(p.timer.time, 'seconds').format('mm:ss', { trim: 'false' })}</div><br/><div class="position">${this.pos}. Place</div>`;
				}

				let d = 0;
				this.data.currentRun.players.forEach((e) => {
					if (e.timer.finished) {
						d++;
					}
				});
				this.pos = d; // eslint-disable-line
				return `<div class="time">${p.timer.time >= 3600 ? moment.duration(p.timer.time, 'seconds').format('h:mm:ss', { trim: 'false' })
					: moment.duration(p.timer.time, 'seconds').format('mm:ss', { trim: 'false' })}</div><br/><div class="position">${this.pos}. Place</div>`;
			}
			return '';
		},
	},
};

// if (d.t >= 3600) {
// 						this.data.timer.formatted = moment.duration(d.t, 'seconds').format('h:mm:ss', { trim: 'false' });
// 					} else {
// 						this.data.timer.formatted = moment.duration(d.t, 'seconds').format('mm:ss', { trim: 'false' });
// 					}
</script>

<style>
html {
	background-color: #00ff00;
}
body {
	color: white !important;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 50px;
}
</style>
