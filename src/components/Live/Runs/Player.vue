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
			if (this.data.currentRun.players.length === 1) {
				return '';
			} else if (this.$route.params.id && parseInt(this.$route.params.id, 10) >= this.data.currentRun.players.length) {
				return '';
			}
			const p = this.data.currentRun.players[this.$route.params.id];
			return p.displayName;
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
