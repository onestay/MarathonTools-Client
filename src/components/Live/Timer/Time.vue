<template>
	<div :state="data.timer.state">{{ output }}</div>
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
			return this.data.timer.formatted;
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
div[state="stop"] {
	color: red;
}
</style>
