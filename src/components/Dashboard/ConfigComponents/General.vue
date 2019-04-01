<template>
	<div>
		<b-field label="Currency icon">
			<b-input v-model="data.settings.currency"/>
		</b-field>
		<b-field label="Host dashboard chat channel">
			<b-input v-model="data.settings.chat"/>
		</b-field>
		<b-field label="Live view player social circle time (in milliseconds)">
			<b-input v-model="data.settings.socialCircleTime"/>
		</b-field>
		<b-field label="Targeted Twitch channel for title/game updates (same channel as authenticated when empty)">
			<b-input v-model="data.settings.twitchUpdateChannel"/>
		</b-field>
		<button
			class="button is-primary"
			@click="submitSettings">Save settings</button>
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
	methods: {
		submitSettings() {
			const newSettings = this.data.settings;
			newSettings.socialCircleTime = parseInt(newSettings.socialCircleTime, 10);
			this.$http.post('/settings', this.data.settings)
				.then(() => {
					this.$toast.open('Settings saved!');
				});
		},
	},
};
</script>

<style>

</style>
