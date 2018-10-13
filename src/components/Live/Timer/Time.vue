<template>
	<div
		id="timer"
		:state="data.timer.state"
	>{{ output }}</div>
</template>

<script>
import textfit from 'textfit';

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
			const t = this.data.timer.formatted;

			if (document.getElementsByClassName('textFitted').length > 0) {
				document.getElementsByClassName('textFitted')[0].innerHTML = t;
			}

			return this.data.timer.formatted;
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
	mounted() {
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
