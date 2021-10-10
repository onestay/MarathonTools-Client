<template>
	<div id="timer">
		{{ output }}
	</div>
</template>

<script>
import textfit from 'textfit';
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
			let t = '';
			if (this.data.currentRun.players.length === 1) {
				return '';
			}
			if (this.$route.params.id && parseInt(this.$route.params.id, 10) >= this.data.currentRun.players.length) {
				return '';
			}
			const p = this.data.currentRun.players[this.$route.params.id];

			// TODO: display position of player
			if (p.timer.finished) {
				t = p.timer.time >= 3600 ? moment.duration(p.timer.time, 'seconds').format('h:mm:ss', { trim: 'false' })
					: moment.duration(p.timer.time, 'seconds').format('mm:ss', { trim: 'false' });
			}

			if (document.getElementsByClassName('textFitted').length > 0) {
				document.getElementsByClassName('textFitted')[0].innerHTML = t;
			}

			return '';
		},
	},
	updated() {
		textfit(document.getElementById('timer'), {
			alignHoriz: false,
			alignVert: true,
			minFontSize: 10,
			maxFontSize: 120,
			multiLine: false,
		});
	},
};
</script>

<style scoped>
#timer {
	height: 100vh;
}
</style>
