<template>
	<div class="card">
		<header class="card-header">
			<span class="card-header-title">Runinfo</span>
		</header>
		<div class="card-content">
			<div class="content">
				<ul class="bullet">
					<li>
						<b-icon icon="gamepad-variant" />
						<span>{{ data.currentRun.gameInfo.gameName }} ({{ data.currentRun.gameInfo.releaseYear }})</span>
					</li>
					<li>
						<b-icon icon="tag"/>
						<span>{{ data.currentRun.runInfo.category }}</span>
					</li>
					<li>
						<b-icon icon="timer-sand-full" />
						<span>{{ data.currentRun.runInfo.estimate }}</span>
					</li>
					<li>
						<b-icon icon="laptop-windows" />
						<span>{{ data.currentRun.runInfo.platform }}</span>
					</li>
				</ul>
			</div>
		</div>
		<header class="card-header">
			<span class="card-header-title">Playerinfo</span>
		</header>
		<div class="card-content">
			<div class="content">
				<div
					v-for="player in data.currentRun.players"
					:key="player.displayName"
					class="inline">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<button
								class="button"
								aria-haspopup="true"
								aria-controls="dropdown-menu4">
								<span>{{ player.displayName }}</span>
								<b-icon icon="chevron-down"/>
							</button>
						</div>
						<div
							class="dropdown-menu"
							id="dropdown-menu4"
							role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<span>Twitch: {{ player.twitchName }}</span>
								</div>
								<div class="dropdown-item">
									<span>Twitter: {{ player.twitterName }}</span>
								</div>
								<div class="dropdown-item">
									<span>Youtube: {{ player.youtubeName }}</span>
								</div>
								<hr class="dropdown-divider">
								<div class="dropdown-item">
									<span>{{ player.country }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="card-footer">
			<a
				class="button card-footer-item"
				:disabled="data.prevRun.runID === '' || data.timer.state !== 2"
				@click="switchRuns('prev')">
				<b-icon icon="chevron-left" />
				<span>Previous ({{ data.prevRun.gameInfo.gameName }})</span>
			</a>
			<a
				class="button card-footer-item"
				:disabled="data.nextRun.runID === '' || data.timer.state !== 2"
				@click="switchRuns('next')">
				<b-icon icon="chevron-right" />
				<span>Next ({{ data.nextRun.gameInfo.gameName }})</span>
			</a>
		</footer>
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
		switchRuns(s) {
			this.$http.post(`/run/switch?m=${s}`);
		},
	},
};
</script>

<style>
.inline {
	display: inline-block !important;
}
.bullet {
	list-style-type: none !important;
}
</style>
