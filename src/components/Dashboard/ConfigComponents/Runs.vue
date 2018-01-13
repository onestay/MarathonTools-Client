<template>
    <div>
        <div v-for="run in data.runs" :key="run.runID">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">{{run.gameInfo.gameName}}</p>
                    <a class="card-header-icon" aria-label="more options" href="#" @click.prevent="toggleExtend">
                    <span class="icon">
						<i class="material-icons">arrow_drop_down</i>
					</span>
                    </a>
                </header>
                <div :class="{'hide-content': true}">
                    <div class="card-content">
                        <ul>
                            <li>Game: <strong>{{data.currentRun.gameInfo.gameName}}
							({{data.currentRun.gameInfo.releaseYear}})</strong>
                            </li>
                            <li>Category: <strong>{{data.currentRun.runInfo.category}}</strong></li>
                            <li>Estimate: <strong>{{data.currentRun.runInfo.estimate}}</strong></li>
                            <li>Platform: <strong>{{data.currentRun.runInfo.platform}}</strong></li>
                        </ul>
                        <p>Playerinfo:</p>
                        <div v-for="player in run.players" :key="player.name" class="inline">
                            <div class="dropdown is-hoverable">
                                <div class="dropdown-trigger">
                                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
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
                    <footer class="card-footer">
                        <a href="#" class="card-footer-item" @click.prevent="editRun(run.runID)">
							<span class="icon">
								<i class="material-icons md-36">edit</i>
							</span>
							Edit
						</a>
						<a href="#" class="card-footer-item is-warning" @click.prevent="deleteRun(run.runID)">
							<span class="icon">
								<i class="material-icons md-36">delete</i>
							</span>
							Delete
						</a>
                    </footer>
                </div>
            </div>
        </div>
		<b-modal :active.sync="editModalOpen" :width="640" scroll="keep">
			<div class="card">
				<div class="card-content">
					<b-field grouped>
						<b-field label="Gamename">
							<b-input v-model="editModalRun.gameInfo.gameName"></b-input>
						</b-field>
						<b-field label="Release year">
							<b-input v-model="editModalRun.gameInfo.releaseYear"></b-input>
						</b-field>
					</b-field>
				</div>
			</div>
		</b-modal>
    </div>
</template>

<script>
export default {
	data() {
		return {
			editModalOpen: false,
			editModalRun: {
				gameInfo: {
					gameName: '',
					releaseYear: 0,
				},
				runInfo: {
					estimate: '',
					category: '',
					platform: '',
				},
				players: [
					{
						displayName: '',
						country: '',
						twitterName: '',
						twitchName: '',
					},
				],
			},
		};
	},
	props: ['data'],
	methods: {
		toggleExtend(e) {
			e.path[4].children[1].classList.toggle('hide-content');
		},
		deleteRun(id) {
			this.$dialog.confirm({
				title: 'Deleting run',
				message: 'Are you sure you want to delete this run? This action cannot be undone.',
				confirmText: 'Delete run',
				type: 'is-danger',
				hasIcon: false,
				onConfirm: () => {
					this.$http.delete(`/run/delete/${id}`)
						.then(() => {
							this.$toast.open('Run succesfully deleted!');
						});
				},
			});
		},
		editRun(id) {
			this.editModalRun = this.data.runs.find(el => el.runID === id);
			this.editModalOpen = true;
		},
	},
};
</script>

<style>
.hide-content {
	display: none;
}
.inline {
	display: inline-block !important;
}
</style>
