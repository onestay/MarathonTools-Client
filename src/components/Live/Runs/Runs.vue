<template>
	<div id="runs">{{ output }}</div>
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
	data() {
		return {
			text: '',
		};
	},
	computed: {
		output() {
			let c;
			let t;

			if (this.$route.params.type === 'current') {
				c = this.data.currentRun;
			} else if (this.$route.params.type === 'prev') {
				c = this.data.prevRun;
			} else if (this.$route.params.type === 'next') {
				c = this.data.upNextRun;
			} else {
				return 'no valid type found. has to be one of "current", "prev" or "next"';
			}

			if (!this.$route.params.part) {
				return 'INVALID';
			}

			if (this.$route.params.part === 'game') {
				t = c.gameInfo.releaseYear ? `${c.gameInfo.gameName} (${c.gameInfo.releaseYear})` : `${c.gameInfo.gameName}`;
			} else if (this.$route.params.part === 'category') {
				t = c.runInfo.category;
			} else if (this.$route.params.part === 'estimate') {
				t = c.runInfo.estimate;
			} else if (this.$route.params.part === 'platform') {
				t = c.runInfo.platform;
			} else if (this.$route.params.part === 'players') {
				t = c.players.map(p => p.displayName).join(', ');
			} else if (this.$route.params.part === 'gamecat') {
				t = c.gameInfo.releaseYear ? `${c.gameInfo.gameName} (${c.gameInfo.releaseYear}) </br> ${c.runInfo.category}` : `${c.gameInfo.gameName} </br> ${c.runInfo.category}`;
			}

			const i = t.indexOf(':');
			if (i !== -1 && (this.$route.params.part === 'gamecat' || this.$route.params.part === 'game') && this.$route.params.type === 'current') {
				// sorry martin :(
				t = `${t.slice(0, i + 1)} </br> ${t.slice(i + 1)}`;
			}


			if (document.getElementsByClassName('textFitted').length > 0) {
				document.getElementsByClassName('textFitted')[0].innerHTML = t;
			}

			if (t) {
				return t;
			}
			return 'no valid part found. has to be one of "game", "category", "estimate", "platform" or "players"';
		},
	},
	updated() {
		console.log('called update');
		textfit(document.getElementById('runs'), {
			alignHoriz: false,
			alignVert: true,
			minFontSize: 10,
			maxFontSize: 80,
			multiLine: true,
		});

	// html {
	//	background: none !important;
	//  overflow: hidden;
	// }
	// #runs {
	// 	color: white !important;
	// }
	},
	// mounted() {
	// 	textfit(document.getElementById('timer'), {
	// 		alignHoriz: false,
	// 		alignVert: true,
	// 		minFontSize: 10,
	// 		maxFontSize: 120,
	// 		multiLine: false,
	// 	});
	// },

};
</script>

<style scoped>
#runs {
	height: 100vh;
}
</style>
