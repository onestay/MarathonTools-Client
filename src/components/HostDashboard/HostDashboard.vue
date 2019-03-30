<template>
	<div class="section">
		<h2 class="is-size-3 has-text-left">GSM Host Dashboard Panel</h2>
		<hr>
		<div class="container">
			<div class="tile is-ancestor">
				<div class="tile is-parent">
					<div class="tile is-child">
						<div class="content">
							<mt-di :data="data" />
						</div>
					</div>
				</div>
				<div class="tile is-parent">
					<div class="tile is-child" />
				</div>
				<div class="tile is-vertical">
					<div class="tile">
						<div class="tile is-parent is-vertical">
							<div class="tile">
								<mt-rd :r="data" />
							</div>
						</div>
					</div>
				</div>
				<div class="tile is-parent">
					<div class="tile is-child">
						<div class="content">
							<iframe
								id="riotgames"
								src="https://www.twitch.tv/embed/riotgames/chat"
								frameborder="0"
								height="800"
								width="350"
								scrolling="yes" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import RunDisplay from './RunDisplay.vue';
import DonationInfo from './DonationInfo.vue';

export default {
	components: {
		'mt-rd': RunDisplay,
		'mt-di': DonationInfo,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},

};
</script>
