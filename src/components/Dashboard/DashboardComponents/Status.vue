<template>
	<div>
		<div v-if="isLoading">
			<h3 class="is-size-3">
				Fetching data...
			</h3>
		</div>
		<div v-else>
			<h3 class="is-size-3">
				Status
			</h3>
			<h4 class="is-size-4">
				Layout
			</h4>
			<button
				class="button is-primary"
				@click="refreshLayout"
			>
				Refresh Layout
			</button>
			<h4 class="is-size-4">
				Social
			</h4>
			<div v-if="twitchIsConnected">
				<span>Twitch is connected</span>
				<br>
				{{ viewers }}
				<hr>
				<div>Social Updates</div>
				<button
					class="button is-primary"
					@click="updateSocial('twitch')"
				>
					Update Twitch info
				</button>
				<button
					style="margin-left: 10px;"
					class="button is-primary"
					@click="updateSocial('twitter')"
				>
					Send tweet
				</button>
				<hr>
				<div>Twitch Ads</div>
				<b-field grouped>
					<b-field label="Ad duration">
						<b-select v-model="adDuration">
							<option :value="30">
								30s
							</option>
							<option :value="60">
								60s
							</option>
							<option :value="90">
								90s
							</option>
							<option :value="120">
								120s
							</option>
							<option :value="150">
								150s
							</option>
							<option :value="180">
								180s
							</option>
						</b-select>
					</b-field>
					<b-field label="Run ad">
						<button
							class="button is-danger"
							@click="runAd"
						>
							Run ad
						</button>
					</b-field>
				</b-field>
			</div>
			<div v-else>
				<span>Twitch isn't conntected.</span>
			</div>
			<div>
				<h4 class="is-size-4">
					Donations
				</h4>
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
			adDuration: 30,
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
			return `Current donation amount: ${this.data.donationInfo.amountNew}${this.data.settings.currency}`;
		},
	},
	created() {
		this.fetchData();
	},
	methods: {
		updateSocial(service) {
			if (service === 'twitch') {
				this.$http.put('/social/twitch/update')
					.then(() => {
						this.$buefy.toast.open({
							type: 'is-success',
							message: 'Updated Twitch info',
							position: 'is-bottom',
							duration: 2000,
						});
					})
					.catch((e) => {
						this.$buefy.toast.open({
							type: 'is-danger',
							message: `Couldn't update twitch info. Error: ${e.response.data.error}`,
							position: 'is-bottom',
							duration: 4000,
						});
					});
			} else if (service === 'twitter') {
				this.$http.post('/social/twitter/update')
					.then(() => {
						this.$buefy.toast.open({
							type: 'is-success',
							message: 'Sent tweet',
							position: 'is-bottom',
							duration: 2000,
						});
					})
					.catch((e) => {
						this.$buefy.toast.open({
							type: 'is-danger',
							message: `Couldn't send tweet info. Error: ${e.response.data.error}`,
							position: 'is-bottom',
							duration: 4000,
						});
					});
			}
		},
		refreshLayout() {
			this.$http.post('/run/layout');
		},
		fetchData() {
			this.$http.get('social/twitch/verify')
				.then((res) => {
					this.twitchIsConnected = res.data.data === 'true';
					this.isLoading = false;
				});
		},
		runAd() {
			this.$http.post('social/twitch/commercial', { length: this.adDuration })
				.then((res) => {
					if (res.ok) {
						this.$buefy.toast.open({
							type: 'is-success',
							message: 'Okay',
							position: 'is-bottom',
							duration: 2000,
						});
					}
				})
				.catch((e) => {
					this.$buefy.toast.open({
						type: 'is-danger',
						message: `Couldn't connect run commercial. Error: ${e.response.data.error}`,
						position: 'is-bottom',
						duration: 4000,
					});
				});
		},
	},
};
</script>

<style>

</style>
