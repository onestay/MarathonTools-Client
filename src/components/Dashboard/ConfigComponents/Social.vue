<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<div class="tile is-child box">
				<p class="title">Twitch</p>
				<a
					:href="twitch.oauthUrl"
					class="button is-primary"
					:class="{ 'is-loading': twitch.oauthUrl === '' }"
					:disabled="twitch.isConnected">Connect with Twitch</a>
				<button
					class="button is-danger"
					v-if="twitch.isConnected"
					@click="deleteTwitchInfo">Delete Twitch Info</button>
				<hr>
				<div class="field">
					<b-switch
						v-model="twitch.updateTitle"
						:disabled="twitch.isConnected === false">Update Title</b-switch>
				</div>
				<div class="field">
					<b-switch
						v-model="twitch.updateGame"
						:disabled="twitch.isConnected === false">Update Game</b-switch>
				</div>
				<div class="field">
					<b-switch
						v-model="twitch.viewersInDashboard"
						:disabled="twitch.isConnected === false">Show viewers in Dashboard</b-switch>
				</div>
				<b-field label="Title Template">
					<b-input
						v-model="twitch.template"
						type="textarea" />
				</b-field>
				<div>
					<div class="has-text-grey is-size-7">
						Title Template follows the Go text/template package.
						The Documentation can be found <a
							href="https://golang.org/pkg/text/template/#hdr-Actions"
							target="blank">here</a>.
						The available pipelines are <code>Game</code>, <code>Runner</code>, <code>Platform</code>, <code>Estimate</code> and <code>Category</code>.
						For more info see the <code>twitchTitleOptions</code> type and the <code>run</code> type.
					</div>
					<br>
					<div>
						Example Title Output:
						"{{ twitch.title }}"
					</div>
				</div>
				<hr>
				<button
					class="button is-primary"
					@click="submitTwitchSettings">Submit Twitch settings</button>
			</div>
			<div class="tile is-child box">
				<p class="title">Twitter</p>
				{{ twitter.oauthurl }}
				<a
					:href="twitter.oauthUrl"
					class="button is-primary"
					:class="{ 'is-loading': twitter.oauthUrl === '' }"
					:disabled="twitter.isConnected">Connect with Twitter</a>
				<button
					class="button is-danger"
					v-if="twitter.isConnected"
					@click="deleteTwitchInfo">Delete Twitch Info</button>
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
				template: 'Loading...',
				title: 'Loading...',
			},
			twitter: {
				oauthUrl: '',
				isConnected: false,
			},
			debug: 'debug',
		};
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
						this.$router.push('/dashboard/config/social');
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
	methods: {
		fetchData() {
			this.$http.get('/social/twitch/oauthurl')
				.then((res) => {
					this.twitch.oauthUrl = res.body.data;
				});
			this.$http.get('/social/twitter/oauthurl')
				.then((res) => {
					this.twitter.oauthUrl = res.body.data;
				});
			this.$http.get('/social/twitch/settings')
				.then((res) => {
					this.twitch.updateGame = res.body.gameUpdate;
					this.twitch.updateTitle = res.body.titleUpdate;
					this.twitch.viewersInDashboard = res.body.viewers;
					this.twitch.template = res.body.templateString;
				});
			this.$http.get('/social/twitch/executetemplate')
				.then((res) => {
					if (res.body.ok) {
						this.twitch.title = res.body.data;
					}
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
					} else {
						this.twitch.isConnected = false;
					}
				});
		},
		deleteTwitchInfo() {
			this.$http.delete('/social/twitch/token')
				.then(() => {
					this.verifyConnections();
				});
		},
		submitTwitchSettings() {
			this.$http.put('/social/twitch/settings', {
				titleUpdate: this.twitch.updateTitle,
				gameUpdate: this.twitch.updateGame,
				viewers: this.twitch.viewersInDashboard,
				templateString: this.twitch.template,
			})
				.then(() => {
					this.$toast.open({
						message: 'Settings saved',
						position: 'is-bottom',
						type: 'is-success',
					});
					this.$http.get('/social/twitch/executetemplate')
						.then((res) => {
							if (res.body.ok) {
								this.twitch.title = res.body.data;
							}
						});
				});
		},
	},
};
</script>

<style>

</style>
