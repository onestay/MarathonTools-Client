<template>
	<div>
		<div class="tags has-addons">
			<span class="tag is-primary is-large">{{ player.displayName }}</span>
			<span v-if="!player.timer.finished" class="tag is-success is-large"><button @click="timerPlayerDone()" class="button is-success is-marginless is-paddingless" :disabled="timerState !== 0"><i class="material-icons">done</i> Finish</button></span>
			<span v-else class="tag is-success is-large">{{parsePlayerTime}}</span>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';

export default {
	props: ['player', 'timerState', 'playerIndex'],
	methods: {
		timerPlayerDone() {
			this.$http.post(`/timer/player/finish/${this.playerIndex}`);
		},
	},
	computed: {
		parsePlayerTime() {
			return moment.duration(this.player.timer.time, 'seconds').format('h:mm:ss', { trim: false });
		},
	},
};
</script>
