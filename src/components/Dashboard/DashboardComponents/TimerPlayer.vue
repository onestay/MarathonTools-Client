<template>
	<div>
		<div class="tags has-addons">
			<span class="tag is-primary is-large">{{ player.displayName }}</span>
			<span
				v-if="!player.timer.finished"
				class="tag is-success is-large">
				<button
					@click="timerPlayerDone()"
					class="button is-success is-marginless is-paddingless"
					:disabled="timerState !== 0">
					<b-icon icon="check"/>
					<span>Done</span>
				</button>
			</span>
			<span
				v-else
				class="tag is-success is-large">{{ parsePlayerTime }}</span>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import 'moment-duration-format';

export default {
	props: {
		player: {
			type: Object,
			default() {
				return {};
			},
		},
		timerState: {
			type: Number,
			default: 0,
		},
		playerIndex: {
			type: Number,
			default: 0,
		},
	},
	computed: {
		parsePlayerTime() {
			return moment.duration(this.player.timer.time, 'seconds').format('h:mm:ss', { trim: false });
		},
	},
	methods: {
		timerPlayerDone() {
			this.$http.post(`/timer/player/finish/${this.playerIndex}`);
		},
	},
};
</script>
