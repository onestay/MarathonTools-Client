<template>
	<div>
		<div v-if="isLoading">
			<h3 class="is-size-3">Fetching data...</h3>
		</div>
		<div v-else>
			<h2 class="is-size-2">Status</h2>
			<h3 class="is-size-3">Social</h3>
			<div v-if="twitchIsConnected">
				<span>Twitch is connected</span>
				<br>
				{{ viewers }}
			</div>
			<div v-else>
				<span>Twitch isn't conntected.</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			twitchIsConnected: false,
			isLoading: true,
		};
	},
	props: ['data'],
	computed: {
		viewers() {
			if (this.data.twitchViewers === -1) {
				return 'Viewer update is either disabled or the channel is not live.';
			}
			return `Channel is live. ${this.data.twitchViewers} viewers.`;
		},
	},
	methods: {
		fetchData() {
			this.$http.get('/social/twitch/verify')
				.then((res) => {
					if (res.body.data === 'true') {
						this.twitchIsConnected = true;
					} else {
						this.twitchIsConnected = false;
					}
					this.isLoading = false;
				});
		},
	},
	created() {
		this.fetchData();
	},
};
</script>

<style>

</style>
