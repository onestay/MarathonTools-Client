<template>
	<div
		id="player"
		v-html="output" />
</template>

<script>
import textfit from 'textfit';
import twitterLogo from './Twitter_bird_logo_2012.svg.png';
import twitchLogo from './Glitch_Purple_RGB.svg';

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
			circleText: '',
			circleRunning: false,
			wh: 1,
			wh2: 1,
			circleInterval: null,
			player: {
				displayName: '',
			},
		};
	},
	computed: {
		output() {
			if (this.$route.params.id && parseInt(this.$route.params.id, 10) >= this.data.currentRun.players.length) {
				return '';
			}
			const p = this.data.currentRun.players[this.$route.params.id];
			let t = '';
			if (!this.$route.params.part) {
				return 'INVALID';
			}

			if (this.$route.params.part === 'name') {
				t = p.displayName;
			} else if (this.$route.params.part === 'twitter' && p.twitterName) {
				t = `<span><img src="${twitterLogo}" style="width:${this.wh}px; height:${this.wh * 0.8135}px;vertical-align:middle;"/>${p.twitterName}</span>`;
			} else if (this.$route.params.part === 'twitch' && p.twitchName) {
				t = `<span><img src="${twitchLogo}" style="width:${this.wh}px; height:${this.wh * 0.8135}px;vertical-align:middle;"/>${p.twitchName}</span>`;
			} else if (this.$route.params.part === 'circle') {
				if (this.player.displayName !== p.displayName && this.circleRunning) {
					/* eslint-disable vue/no-side-effects-in-computed-properties */
					this.circleRunning = false;
					clearInterval(this.circleInterval);
				}
				if (!this.circleRunning) {
					this.startCircle(p);
					this.player = p;
					this.circleRunning = true;
					/* eslint-enable vue/no-side-effects-in-computed-properties */
				}
				t = this.circleText;
			}

			if (document.getElementsByClassName('textFitted').length > 0) {
				document.getElementsByClassName('textFitted')[0].innerHTML = t;
			}

			return t;
		},
	},
	updated() {
		textfit(document.getElementById('player'), {
			alignHoriz: false,
			alignVert: true,
			minFontSize: 10,
			maxFontSize: 80,
			multiLine: true,
		});

		this.wh = parseInt(window.getComputedStyle(document.getElementsByClassName('textFitted')[0]).getPropertyValue('font-size'), 10);
	},
	methods: {
		startCircle(playerInfo) {
			let i = 0;
			let props;
			if (playerInfo.twitchName.length === 0 && playerInfo.twitterName.length === 0) {
				props = [playerInfo.displayName];
			} else if (playerInfo.twitchName.length === 0) {
				props = [playerInfo.displayName, '', playerInfo.twitterName];
			} else if (playerInfo.twitterName.length === 0) {
				props = [playerInfo.displayName, playerInfo.twitchName, ''];
			} else {
				props = [playerInfo.displayName, playerInfo.twitchName, playerInfo.twitterName];
			}

			this.circleInterval = setInterval(() => {
				let logo;
				if (i === 1 && props[1].length === 0) {
					i = 2;
				} else if (i === 2 && props[2].length === 0) {
					i = 0;
				}
				if (i === 1) {
					logo = twitchLogo;
				} else if (i === 2) {
					logo = twitterLogo;
				} else if (i === 3) {
					logo = null;
				}
				this.circleText = logo ? `<span><img src="${logo}" style="width:${this.wh}px; height:${this.wh * 0.8135}px;vertical-align:middle;">${props[i]}</span>` : `<span>${props[i]}</span>`;

				if (i === 2) {
					i = 0;
				} else {
					i++;
				}
			}, 1000);
		},
	},
};
// style="width:${wh}px; height:${wh}px; vertical-align: bottom;
</script>

<style>
#player {
	height: 100vh;
}
.social-img {
	width: 120px;
	height: 120px;
	vertical-align: bottom;
}
</style>
