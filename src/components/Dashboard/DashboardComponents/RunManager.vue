<template>
	<div class="card">
		<header class="card-header">
			<span class="card-header-title">Runinfo</span>
		</header>
		<div class="card-content">
			<div class="content">
				<ul>
					<li>{{data.currentRun.gameInfo.gameName}}
						({{data.currentRun.gameInfo.releaseYear}})
					</li>
					<li>{{data.currentRun.runInfo.category}}</li>
					<li>{{data.currentRun.runInfo.estimate}}</li>
					<li>{{data.currentRun.runInfo.platform}}</li>
				</ul>
			</div>
		</div>
		<header class="card-header">
			<span class="card-header-title">Playerinfo</span>
		</header>
		<div class="card-content">
			<div class="content">
				<div v-for="player in data.currentRun.players" :key="player.displayName">
					<div class="dropdown is-hoverable">
						<div class="dropdown-trigger">
							<button class="button" aria-haspopup="true"
								aria-controls="dropdown-menu4">
							<span>{{player.displayName}}</span>
							<span class="icon is-small">
							<i class="material-icons">arrow_drop_down</i>
							</span>
							</button>
						</div>
						<div class="dropdown-menu" id="dropdown-menu4" role="menu">
							<div class="dropdown-content">
								<div class="dropdown-item">
									<span>Twitch: {{player.twitchName}}</span>
								</div>
								<div class="dropdown-item">
									<span>Twitter: {{player.twitterName}}</span>
								</div>
								<div class="dropdown-item">
									<span>Youtube: {{player.youtubeName}}</span>
								</div>
								<hr class="dropdown-divider">
								<div class="dropdown-item">
									<span>{{player.country}}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<footer class="card-footer">
			<a class="button card-footer-item" :disabled="data.prevRun.runID === ''" @click="switchRuns('prev')">Previous ({{data.prevRun.gameInfo.gameName}})</a>
			<a class="button card-footer-item">Update</a>
			<a class="button card-footer-item" :disabled="data.nextRun.runID === ''" @click="switchRuns('next')">Next ({{data.nextRun.gameInfo.gameName}})</a>

		</footer>
	</div>
</template>

<script>
export default {
	props: ['data'],
	methods: {
		switchRuns(s) {
			this.$http.post(`/run/switch?m=${s}`)
				.then((r) => {
					console.log(r);
				})
				.catch(e => console.log(e));
		},
	},
};
</script>

<style module>
.dark-footer {
	background-color: #363636 !important;
	color: white !important;
}
</style>
