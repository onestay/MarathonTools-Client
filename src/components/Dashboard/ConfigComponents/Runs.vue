<template>
	<div>
		<b-field
			grouped
			group-multiline>
			<button
				:disabled="!selected"
				class="button field is-danger"
				@click="deleteRun()"
			>
				<b-icon icon="close" />
				<span>Delete selected</span>
			</button>
			<button
				class="button field is-primary"
				@click="modalActive = true">
				<b-icon icon="plus" />
				<span>Add run</span>
			</button>
		</b-field>
		<b-table
			:data="runData"
			:columns="columns"
			:striped="true"
			:loading="isLoading"
			:selected.sync="selected"
			detailed>
			<template
				slot="detail"
				slot-scope="props">
				<b-field grouped>
					<b-field label="Game">
						<b-input v-model="props.row.runData.gameInfo.gameName"/>
					</b-field>
					<b-field label="Release year">
						<b-input v-model="props.row.runData.gameInfo.releaseYear" />
					</b-field>
					<b-field label="Platform">
						<b-input v-model="props.row.runData.runInfo.platform" />
					</b-field>
				</b-field>
				<b-field grouped>
					<b-field label="Category">
						<b-input v-model="props.row.runData.runInfo.category" />
					</b-field>
					<b-field label="Estimate">
						<b-input v-model="props.row.runData.runInfo.estimate" />
					</b-field>
				</b-field>
				<b-field
					v-for="(player, i) in props.row.runData.players"
					:key="player.displayName"
					grouped>
					<b-field :label="`Player ${i+1} Name`">
						<b-input v-model="props.row.runData.players[i].displayName" />
					</b-field>
					<b-field :label="`Player ${i+1} Twitter`">
						<b-input v-model="props.row.runData.players[i].twitterName" />
					</b-field>
					<b-field :label="`Player ${i+1} Twitch`">
						<b-input v-model="props.row.runData.players[i].twitchName" />
					</b-field>
				</b-field>
				<button
					class="button is-success is-medium"
					@click="saveEdit(props.row.runData)">Save edits</button>
				<b-field label="Move">
					<b-select v-model="moveRunEditID">
						<option
							v-for="run in data.runs"
							:value="run.runID"
							:key="run.runID">
							{{ run.gameInfo.gameName }}
						</option>
					</b-select>
				</b-field>
				<button
					class="button is-success is-medium"
					@click="moveRun(props.row.runData)"
				>Move run</button>
			</template>
		</b-table>
		<b-modal
			:active.sync="modalActive"
			@close="closeModal">
			<div
				class="modal-card"
				style="width: auto">
				<header class="modal-card-head">
					<p class="modal-card-title">Add run</p>
				</header>
				<section class="modal-card-body">
					<b-field grouped>
						<b-field label="Game">
							<b-input v-model="addRun.gameInfo.gameName"/>
						</b-field>
						<b-field label="Release year">
							<b-input v-model="addRun.gameInfo.releaseYear" />
						</b-field>
						<b-field label="Platform">
							<b-input v-model="addRun.runInfo.platform" />
						</b-field>
					</b-field>
					<b-field grouped>
						<b-field label="Category">
							<b-input v-model="addRun.runInfo.category" />
						</b-field>
						<b-field label="Estimate">
							<b-input v-model="addRun.runInfo.estimate" />
						</b-field>
					</b-field>
					<hr>
					<div style="display: flex; justify-content: center">
						<button
							class="button is-medium"
							@click="addPlayer">
							<b-icon
								icon="plus"
								size="is-large"/>
						</button>
					</div>
					<p
						v-if="addRun.players.length == 0"
						class="has-text-centered has-text-weight-light is-italic"
					>Click plus to add a player</p>
					<div
						v-for="(player, i) in addRun.players"
						:key="i">
						<h5 class="is-size-5">Player {{ i + 1 }}</h5>
						<b-field grouped>
							<b-field label="Displayname">
								<b-input v-model="player.displayName" />
							</b-field>
							<b-field label="Twitter handle">
								<b-input v-model="player.twitterName"/>
							</b-field>
							<b-field label="Twitch name">
								<b-input v-model="player.twitchName"/>
							</b-field>
						</b-field>
					</div>
					<div
						v-if="addRun.players.length != 0"
						style="display: flex; justify-content: center"
					>
						<button
							class="button is-medium"
							@click="addRun.players.splice(-1, 1)">
							<b-icon
								icon="minus"
								size="is-large"/>
						</button>
					</div>
					<hr>
					<b-field label="Insert before">
						<b-select
							v-model="addRun.after"
							placeholder="at end">
							<option
								v-for="run in data.runs"
								:value="run.runID"
								:key="run.runID">
								{{ run.gameInfo.gameName }}
							</option>
						</b-select>
					</b-field>
				</section>
				<footer class="modal-card-foot">
					<button
						class="button is-danger"
						@click="closeModal">
						<b-icon icon="close"/>
						<span>Close without saving</span>
					</button>
					<button
						class="button is-success"
						@click="saveRun">
						<b-icon icon="content-save" />
						<span>Save run</span>
					</button>
				</footer>
			</div>
		</b-modal>
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
			isLoading: true,
			moveRunEditID: '',
			columns: [
				{
					field: 'game',
					label: 'Game',
				},
				{
					field: 'estimate',
					label: 'Estimate',
				},
				{
					field: 'player',
					label: 'Runner(s)',
				},
				{
					field: 'platform',
					label: 'Platform',
				},
				{
					field: 'category',
					label: 'Category',
				},
				{
					field: 'runData',
					visible: false,
				},
			],
			runData: [],
			selected: {},
			addRun: {
				gameInfo: {
					gameName: '',
					releaseYear: '',
				},
				players: [],
				runInfo: {
					category: '',
					estimate: '',
					platform: '',
				},
				after: '',
			},
			modalActive: false,
		};
	},
	watch: {
		'data.runs': function () { // eslint-disable-line
			this.updateTable();
		},
	},
	mounted() {
		this.updateTable();
	},
	methods: {
		moveRun(runData) {
			this.$http.post(`run/move/${runData.runID}/${this.moveRunEditID}`);
		},
		deleteRun() {
			this.$dialog.confirm({
				title: 'Deleting run',
				message: 'Are you sure you want to delete this run? This action cannot be undone.',
				confirmText: 'Delete run',
				type: 'is-danger',
				hasIcon: false,
				onConfirm: () => {
					this.$http.delete(`run/delete/${this.selected.runData.runID}`)
						.then(() => {
							this.$toast.open('Run succesfully deleted!');
						})
						.catch(() => {
							this.$toast.open({
								message: 'Request status not okay. Error:',
								position: 'is-bottom',
								type: 'is-danger',
							});
						});
				},
			});
		},
		updateTable() {
			this.runData = [];
			for (let i = 0; i < this.data.runs.length; i++) {
				const e = this.data.runs[i];
				this.runData.push({
					runData: e,
					game: e.gameInfo.releaseYear ? `${e.gameInfo.gameName} (${e.gameInfo.releaseYear})` : e.gameInfo.gameName,
					estimate: e.runInfo.estimate,
					player: e.players.map(p => p.displayName).join(', '),
					platform: e.runInfo.platform,
					category: e.runInfo.category,
				});
			}
			this.isLoading = false;
		},
		saveEdit(run) {
			this.$http.patch(`run/update/${run.runID}`, run)
				.then(() => {
					this.$toast.open({
						message: 'Updated!',
						position: 'is-bottom',
						type: 'is-success',
					});
				})
				.catch(() => {
					this.$toast.open({
						message: 'Request status not okay. Error:',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		addPlayer() {
			this.addRun.players.push({
				country: '',
				displayName: '',
				twitchName: '',
				twitterName: '',
				youtubeName: '',
			});
		},
		saveRun() {
			this.modalActive = false;
			this.addRun.gameInfo.releaseYear = parseInt(this.addRun.gameInfo.releaseYear, 10);
			this.$http.post('run/add/single', this.addRun)
				.then((res) => {
					if (!res.data.ok) {
						this.$toast.open({
							message: 'Request status not okay. Error:',
							position: 'is-bottom',
							type: 'is-danger',
						});
						return;
					} else if (this.addRun.after) {
						this.$http.post(`run/move/${res.data.data}/${this.addRun.after}`);
					}
					this.$toast.open({
						message: 'Added run!',
						position: 'is-bottom',
						type: 'is-success',
					});

					this.addRun = {
						gameInfo: {
							gameName: '',
							releaseYear: '',
						},
						players: [],
						runInfo: {
							category: '',
							estimate: '',
							platform: '',
						},
						after: '',
					};
				});
		},
		closeModal() {
			this.modalActive = false;
			this.addRun = {
				gameInfo: {
					gameName: '',
					releaseYear: '',
				},
				players: [],
				runInfo: {
					category: '',
					estimate: '',
					platform: '',
				},
				after: '',
			};
		},
	},
};
</script>

<style scoped>
.hide-content {
	display: none;
}
.inline {
	display: inline-block !important;
}
.input-group-header {
	margin-bottom: 5px;
}
.test {
	width: auto !important;
}
</style>
