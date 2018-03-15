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

<style scoped>
html {
	background-color: #00ff00;
}
body {
	color: white !important;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 50px;
}
div[state="0"] {
	color: white;
}
div[state="1"] {
	color: yellow;
}
div[state="2"] {
	color: grey;
}
div[state="3"] {
	color: green;
}
</style>
