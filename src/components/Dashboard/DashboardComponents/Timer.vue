<template>
	<div>
		<div>
			<h1 class="title has-text-centered">
				{{ data.timer.formatted }}
			</h1>
			<div class="has-text-centered">
				<div v-if="data.timer.state === 0">
					<button
						class="button is-warning is-medium"
						@click="timerAction('pause')"
					>
						Pause
					</button>
					<button
						class="button is-danger is-medium"
						@click="timerAction('finish')"
					>
						Finish
					</button>
				</div>
				<div v-else-if="data.timer.state === 1">
					<button
						class="button is-danger is-medium"
						@click="timerAction('reset')"
					>
						Reset
					</button>
					<button
						class="button is-info is-medium"
						@click="timerAction('resume')"
					>
						Resume
					</button>
				</div>
				<div v-else-if="data.timer.state === 2">
					<button
						class="button is-success is-medium"
						@click="timerAction('start')"
					>
						Start
					</button>
				</div>
				<div v-else-if="data.timer.state === 3">
					<button
						class="button is-danger is-medium"
						@click="timerAction('reset')"
					>
						Reset
					</button>
					<button
						class="button is-info is-medium"
						@click="timerAction('resume')"
					>
						Resume
					</button>
				</div>
				<div v-else>
					<span>Invalid timer state. This shouldn't happen</span>
				</div>
			</div>
		</div>
		<hr>
		<div class="columns">
			<mt-player
				v-for="(p, i) in data.currentRun.players"
				:key="p.displayName"
				:player="p"
				:timer-state="data.timer.state"
				:player-index="i"
				class="column"
			/>
		</div>
		<div
			v-if="!data.checklistDone"
			class="is-size-5 has-text-centered"
		>
			<strong class="">Checklist isn't done!</strong>
		</div>
	</div>
</template>

<script>
import TimerPlayer from './TimerPlayer.vue';

export default {
	components: {
		'mt-player': TimerPlayer,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	methods: {
		timerAction(action) {
			this.$http.post(`timer/${action}`);
		},
	},
};
</script>

<style>
</style>
