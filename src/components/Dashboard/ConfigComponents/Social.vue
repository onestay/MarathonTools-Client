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
					@click="deleteTwitterInfo">Delete Twitter Info</button>
				<hr>
				<b-field>
					<b-switch
						v-model="twitter.sendTweets"
						:disabled="!twitter.isConnected"
						@input="submitTwitterSettings">Send tweets on run changes</b-switch>
				</b-field>
				<b-field label="Tweet Template">
					<b-input
						type="textarea"
						maxlength="240"
						v-model="twitter.tweetTemplate.text"/>
				</b-field>
				<b-field>
					<b-checkbox v-model="twitter.tweetTemplate.forMultiple">For multiple runners</b-checkbox>
				</b-field>
				<button
					class="button is-primary"
					@click="submitTemplate">Add template</button>
				<div class="has-text-grey is-size-7">
					Tweet Template follows the Go text/template package.
					The Documentation can be found <a
						href="https://golang.org/pkg/text/template/#hdr-Actions"
						target="blank">here</a>.
					The available pipelines are <code>Game</code>, <code>Runner</code>, <code>Platform</code>, <code>Estimate</code> and <code>Category</code>.
					For more info see the <code>twitchTitleOptions</code> type and the <code>run</code> type. <br> A tweet can only be 240 characters long.
					Templates can't be too long or they would go over the maxium allowed limit. If the tweet for the next run is too long it will be shown in the dashboard. <br>
					Tweet templates entered here will be a generic template. Templates can also be defined for individual runs. You can set individual templates in the Runs config tab.
				</div>
				<b-collapse :open="false">
					<button
						class="button is-primary"
						slot="trigger">
						<span>Show existing templates</span>
						<b-icon icon="chevron-down" />
					</button>
					<div
						class="notification"
						v-for="(template, i) in twitter.templates"
						:key="template.text">
						<div class="content">
							{{ template.text }}
							<br>
							<button
								class="button is-danger is-small"
								@click="deleteTemplate(i)">
								<b-icon
									icon="close"
									size="is-small"/>
							</button>
						</div>
					</div>
					<div v-if="twitter.templates.length === 0"><i>No templates added</i></div>
				</b-collapse>
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
				sendTweets: false,
				tweetTemplate: {
					text: '',
					forMultiple: false,
				},
				templates: [],
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
						this.verifyConnections();
						this.$router.push('/dashboard/config/social');
					})
					.catch(() => {
						this.createAlert('Error', 'Couldn\'t connect with Twitch');
					});
			} else if (this.$route.query.error) {
				this.debug = this.$route.query.error_description;
				this.createAlert(this.$route.query.error, this.$route.query.error_description);
			}
			return;
		}
		// basically twitter sucks huge dick and put it's callback stuff before the #
		// example callback url: http://localhost:4000/?oauth_token=XXX&oauth_verifier=XXX#/dashboard/config/social/twitter
		// that means the oauth stuff is at s[3]
		const uri = window.location.href.split('/');
		if (uri[3].search('oauth_token') === 1) {
			// get the query stuff
			const query = uri[3].slice(1, -1);
			this.$http.post(`/social/twitter/auth?${query}`)
				.then(() => {
					this.verifyConnections();
					window.location.href = '/#/dashboard/config/social';
				});
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
			this.getTemplates();
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
			this.$http.get('/social/twitter/verify')
				.then((res) => {
					if (res.body.data === 'true') {
						this.twitter.isConnected = true;
					} else {
						this.twitter.isConnected = false;
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
		deleteTwitterInfo() {
			this.$http.delete('/social/twitter/token')
				.then(() => {
					this.verifyConnections();
				});
		},
		submitTwitterSettings(v) {
			this.$http.put('/social/twitter/settings', { sendTweets: v })
				.then((r) => {
					if (!r.ok) {
						this.$toast.open({
							message: 'Error saving settings',
							position: 'is-bottom',
							type: 'is-danger',
						});
						return;
					}
					this.$toast.open({
						message: 'Settings saved',
						position: 'is-bottom',
						type: 'is-success',
					});
				});
		},
		submitTemplate() {
			this.$http.post('/social/twitter/template', this.twitter.tweetTemplate)
				.then((r) => {
					if (!r.ok) {
						this.$toast.open({
							message: 'Error adding template',
							position: 'is-bottom',
							type: 'is-danger',
						});
						return;
					}
					this.twitter.tweetTemplate.text = '';
					this.twitter.tweetTemplate.forMultiple = false;

					this.twitter.templates = r.body;
					this.$toast.open({
						message: 'Added template',
						position: 'is-bottom',
						type: 'is-success',
					});
				})
				.catch(() => {
					this.$toast.open({
						message: 'Error adding template',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		getTemplates() {
			this.$http.get('/social/twitter/template')
				.then((r) => {
					this.twitter.templates = r.body;
				});
		},
		deleteTemplate(i) {
			this.$http.delete(`/social/twitter/template/${i}`)
				.then((r) => {
					if (!r.ok) {
						this.$toast.open({
							message: 'Error adding template',
							position: 'is-bottom',
							type: 'is-danger',
						});
						return;
					}
					this.twitter.templates = r.body;
				});
		},
	},
};
</script>

<style>

</style>
