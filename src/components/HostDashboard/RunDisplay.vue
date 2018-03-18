<template>
	<div>
		<ul
			v-for="(run, index) in runs"
			:key="run.runID"
			class="run-list">
			<li>{{ index === 0 ? 'Current run' : 'Upcoming run' }}</li>
			<li>Game: {{ run.gameInfo.gameName }} ({{ run.gameInfo.releaseYear }})</li>
			<li>Run: {{ run.runInfo.category }} {{ run.runInfo.estimate }}</li>
			<div>Player(s)</div>
			<li>
				<span
					v-for="(player, index) in run.players"
					:key="player.displayName">{{ player.displayName }}
					<span v-if="index + 1 < run.players.length">, </span>
				</span>
				<hr>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	props: {
		r: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			runs: [],
		};
	},
	watch: {
		// the es5 function declaration is kinda ugly but it only works like thos. I don't really want to deep check the object on every change because
		// it changes quite often and is kinda huge
		'r.currentRun.runID': function (newVal) { // eslint-disable-line
			this.updateDisplay(newVal);
		},
	},
	mounted() {
		this.updateDisplay(this.r.currentRun.runID);
	},
	methods: {
		updateDisplay(runID) {
			this.runs = [];
			const index = this.r.runs.findIndex(el => el.runID === runID) || 1;

			for (let i = index; i < index + 3; i++) {
				this.runs.push(this.r.runs[i]);
			}
		},
	},
};
</script>

<style>
.run-list li {
	list-style-type: circle;
}
</style>
