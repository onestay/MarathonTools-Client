<template>
	<div id="runs">
		{{ output }}
	</div>
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
			wh: 0,
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
				t = c.gameInfo.releaseYear ? `${c.gameInfo.gameName} (${c.gameInfo.releaseYear}) </br> <span style="font-size:${this.wh * 0.7}px">${c.runInfo.category}</span>` : `${c.gameInfo.gameName} </br> <span style="font-size:${this.wh * 0.7}px">${c.runInfo.category}</span>`;
			}

			const i = c.gameInfo.gameName.indexOf(':');
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
			return '';
		},
	},
	updated() {
		textfit(document.getElementById('runs'), {
			alignHoriz: false,
			alignVert: true,
			minFontSize: 10,
			maxFontSize: 80,
			multiLine: true,
		});

		this.wh = parseInt(window.getComputedStyle(document.getElementsByClassName('textFitted')[0]).getPropertyValue('font-size'), 10);

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
