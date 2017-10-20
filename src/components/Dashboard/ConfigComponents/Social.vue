<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<div class="tile is-child box">
				<p class="title">Twitch</p>
				<a :href="twitch.oauthUrl" class="button is-primary" :class="{ 'is-loading': twitch.oauthUrl === '' }" :disabled="this.twitch.isConnected">Connect with Twitch</a>
				<button class="button is-danger" v-if="twitch.isConnected" @click="deleteTwitchInfo">Delete Twitch Info</button>
				<hr>
				<div class="field">
					<b-switch v-model="twitch.updateTitle" :disabled="twitch.isConnected === false">Update Title</b-switch>
				</div>
				<div class="field">
					<b-switch v-model="twitch.updateGame" :disabled="twitch.isConnected === false">Update Game</b-switch>
				</div>
				<div class="field">
					<b-switch v-model="twitch.viewersInDashboard" :disabled="twitch.isConnected === false">Show viewers in Dashboard</b-switch>
				</div>
			</div>
			<div class="tile is-child box">
				<p class="title">Twitter</p>
					{{debug}}
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			twitch: {
				isConnected: false,
				updateGame: false,
				updateTitle: false,
				viewersInDashboard: false,
				oauthUrl: '',
			},
			debug: 'debug',
		};
	},
	methods: {
		fetchData() {
			this.$http.get('/social/twitch/oauthurl')
				.then((res) => {
					this.twitch.oauthUrl = res.body.data;
				});
		},
		createAlert(title, message) {
			this.$dialog.alert({
				title,
				message,
			});
		},
		verifyConnections() {
			this.$http.get('/social/twitch/verify')
				.then((res) => {
					if (res.body.data === 'true') {
						this.twitch.isConnected = true;
					}
				});
		},
		deleteTwitchInfo() {
			this.$http.delete('/social/twitch/token')
				.then(() => {
					this.verifyConnections();
				});
		},
	},
	created() {
		this.fetchData();
		this.verifyConnections();
		const pathArray = this.$route.path.split('/');
		const lastPart = pathArray[pathArray.length - 1];

		if (lastPart === 'twitch') {
			if (this.$route.query.code) {
				this.$http.post(`/social/twitch/auth?code=${this.$route.query.code}`)
					.then(() => {
						this.createAlert('Success', 'Twitch is connected');
						this.verifyConnections();
					})
					.catch(() => {
						this.createAlert('Error', 'Couldn\'t connect with Twitch');
					});
			} else if (this.$route.query.error) {
				this.debug = this.$route.query.error_description;
				this.createAlert(this.$route.query.error, this.$route.query.error_description);
			}
		}
	},
};
</script>

<style>

</style>
