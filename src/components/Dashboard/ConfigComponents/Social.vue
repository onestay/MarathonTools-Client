<template>
	<div class="tile is-ancestor">
		<div class="tile is-parent">
			<div class="tile is-child box">
				<p class="title">
					Twitch
				</p>
				<a
					:disabled="twitch.isConnected"
					:href="twitch.oauthUrl"
					:class="{ 'is-loading': twitch.oauthUrl === '' }"
					class="button is-primary"
				>Connect with Twitch</a>
				<button
					v-if="twitch.isConnected"
					class="button is-danger"
					@click="deleteTwitchInfo"
				>
					Delete Twitch Info
				</button>
				<hr>
				<div class="field">
					<b-switch
						v-model="twitch.update"
						:disabled="twitch.isConnected === false"
					>
						Update title & game
					</b-switch>
				</div>
				<b-field label="Title Template">
					<b-input
						v-model="twitch.template"
						type="textarea"
					/>
				</b-field>
				<div>
					<div class="has-text-grey is-size-7">
						Title Template follows the Go text/template package.
						The Documentation can be found <a
							href="https://golang.org/pkg/text/template/#hdr-Actions"
							target="blank"
						>here</a>.
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
					@click="submitTwitchSettings"
				>
					Submit Twitch settings
				</button>
			</div>
			<div class="tile is-child box">
				<p class="title">
					Twitter
				</p>
				{{ twitter.oauthurl }}
				<a
					:disabled="twitter.isConnected"
					:class="{ 'is-loading': twitter.oauthUrl === '' }"
					:href="twitter.oauthUrl"
					class="button is-primary"
				>Connect with Twitter</a>
				<button
					v-if="twitter.isConnected"
					class="button is-danger"
					@click="deleteTwitterInfo"
				>
					Delete Twitter Info
				</button>
				<hr>
				<b-field>
					<b-switch
						v-model="twitter.sendTweets"
						:disabled="!twitter.isConnected"
						@change.native="submitTwitterSettings"
					>
						Send tweets on run changes
					</b-switch>
				</b-field>
				<b-field label="Tweet Template">
					<b-input
						v-model="twitter.tweetTemplate.text"
						type="textarea"
						maxlength="240"
					/>
				</b-field>
				<b-field>
					<b-checkbox v-model="twitter.tweetTemplate.forMultiple">
						For multiple runners
					</b-checkbox>
				</b-field>
				<button
					class="button is-primary"
					@click="submitTemplate"
				>
					Add template
				</button>
				<div class="has-text-grey is-size-7">
					Tweet Template follows the Go text/template package.
					The Documentation can be found <a
						href="https://golang.org/pkg/text/template/#hdr-Actions"
						target="blank"
					>here</a>.
					The available pipelines are <code>Game</code>, <code>Runner</code>, <code>Platform</code>, <code>Estimate</code> and <code>Category</code>.
					For more info see the <code>twitchTitleOptions</code> type and the <code>run</code> type. <br> A tweet can only be 240 characters long.
					Templates can't be too long or they would go over the maxium allowed limit. If the tweet for the next run is too long it will be shown in the dashboard. <br>
					Tweet templates entered here will be a generic template. Templates can also be defined for individual runs. You can set individual templates in the Runs config tab.
				</div>
				<b-collapse :open="false">
					<button
						slot="trigger"
						class="button is-primary"
					>
						<span>Show existing templates</span>
						<b-icon icon="chevron-down" />
					</button>
					<div
						v-for="(template, i) in twitter.templates"
						:key="template.text"
						class="notification"
					>
						<div class="content">
							{{ template.text }}
							<br>
							<button
								class="button is-danger is-small"
								@click="deleteTemplate(i)"
							>
								<b-icon
									icon="close"
									size="is-small"
								/>
							</button>
						</div>
					</div>
					<div v-if="twitter.templates.length === 0">
						<i>No templates added</i>
					</div>
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
				update: false,
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
	},
	methods: {
		fetchData() {
			this.$http.get('social/twitch/settings')
				.then((res) => {
					this.twitch.update = res.data.update;
					this.twitch.template = res.data.templateString;
				});
			this.$http.get('social/twitch/executetemplate')
				.then((res) => {
					if (!res.data.ok && res.data.error === 'NOTEMPLATE') {
						this.twitch.template = '';
					} else if (res.data.ok) {
						this.twitch.title = res.data.data;
					}
				});
			this.$http.get('social/twitter/settings')
				.then((res) => {
					this.twitter.sendTweets = res.data.sendUpdates;
				});
			this.getTemplates();
		},
		createAlert(title, message) {
			this.this.$buefy.dialog.alert({
				title,
				message,
			});
		},
		verifyConnections() {
			this.$http.get('social/twitch/verify')
				.then((res) => {
					if (res.data.data === 'true') {
						this.twitch.isConnected = true;
						this.twitch.oauthUrl = 'a';
					} else {
						this.twitch.oauthUrl = res.data.data;
					}
				});
			this.$http.get('social/twitter/verify')
				// eslint-disable-next-line
				.then((res) => {
					if (res.data.data === 'true') {
						this.twitter.isConnected = true;
						this.twitter.oauthUrl = 'a';
					} else {
						this.twitter.oauthUrl = res.data.data;
					}
				});
		},
		deleteTwitchInfo() {
			this.$http.delete('social/twitch/token')
				.then(() => this.verifyConnections());
		},
		submitTwitchSettings() {
			this.$http.put('social/twitch/settings', {
				update: this.twitch.update,
				templateString: this.twitch.template,
			})
				.then(() => {
					this.$buefy.toast.open({
						message: 'Settings saved',
						position: 'is-bottom',
						type: 'is-success',
					});
					this.$http.get('social/twitch/executetemplate')
						.then((res) => {
							if (res.data.ok) {
								this.twitch.title = res.data.data;
							}
						});
				})
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Error saving settings',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		deleteTwitterInfo() {
			this.$http.delete('social/twitter/token')
				.then(() => this.verifyConnections());
		},
		submitTwitterSettings(e) {
			this.$http.put('social/twitter/settings', { sendTweets: e.target.checked })
				.then(() => {
					this.$buefy.toast.open({
						message: 'Settings saved',
						position: 'is-bottom',
						type: 'is-success',
					});
				})
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Error saving settings',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		submitTemplate() {
			this.$http.post('social/twitter/template', this.twitter.tweetTemplate)
				.then((r) => {
					this.twitter.tweetTemplate.text = '';
					this.twitter.tweetTemplate.forMultiple = false;

					this.twitter.templates = r.data;
					this.$buefy.toast.open({
						message: 'Added template',
						position: 'is-bottom',
						type: 'is-success',
					});
				})
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Error adding template',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		getTemplates() {
			this.$http.get('social/twitter/template')
				.then((r) => {
					this.twitter.templates = r.data;
				});
		},
		deleteTemplate(i) {
			this.$http.delete(`social/twitter/template/${i}`)
				.then((r) => {
					this.twitter.templates = r.data;
				})
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Error adding template',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
	},
};
</script>

<style>

</style>
