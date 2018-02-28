<template>
	<div>{{ output }}</div>
</template>

<script>
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
			let c;
			if (this.$route.params.type === 'current') {
				c = this.data.currentRun;
			} else if (this.$route.params.type === 'prev') {
				c = this.data.prevRun;
			} else if (this.$route.params.type === 'next') {
				c = this.data.nextRun;
			} else {
				return 'no valid type found. has to be one of "current", "prev" or "next"';
			}

			if (!this.$route.params.part) {
				return 'INVALID';
			} else if (this.$route.params.part === 'game') {
				return c.gameInfo.releaseYear ? `${c.gameInfo.gameName} (${c.gameInfo.releaseYear})` : c.gameInfo.gameName;
			} else if (this.$route.params.part === 'category') {
				return c.runInfo.category;
			} else if (this.$route.params.part === 'estimate') {
				return c.runInfo.estimate;
			} else if (this.$route.params.part === 'platform') {
				return c.runInfo.platform;
			} else if (this.$route.params.part === 'players') {
				return c.players.map(p => p.displayName).join(', ');
			}
			return 'no valid part found. has to be one of "game", "category", "estimate", "platform" or "players"';
		},
	},
};
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
