<template>
	<div>
		<div v-if="isLoading">
			<h3 class="is-size-3">Fetching data...</h3>
		</div>
		<div v-else>
			<h3 class="is-size-3">Status</h3>
			<h4 class="is-size-4">Social</h4>
			<div v-if="twitchIsConnected">
				<span>Twitch is connected</span>
				<br>
				{{ viewers }}
			</div>
			<div v-else>
				<span>Twitch isn't conntected.</span>
			</div>
			<div>
				<h4 class="is-size-4">Donations</h4>
				<span>{{ donations }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			twitchIsConnected: false,
			isLoading: true,
		};
	},
	computed: {
		viewers() {
			if (this.data.twitchViewers === -1) {
				return 'Viewer update is either disabled or the channel is not live.';
			}
			return `Channel is live. ${this.data.twitchViewers} viewers.`;
		},
		donations() {
			if (this.data.donationInfo.amountOld === -1) {
				return 'Donations are either not enabled or updating';
			}
			return `Current donation amount: ${this.data.donationInfo.amountNew}€`;
		},
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$http.get('social/twitch/verify')
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
};
</script>

<style>

</style>
