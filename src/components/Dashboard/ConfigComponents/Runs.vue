<template>
	<div>
		<b-field
			grouped
			group-multiline>
			<button
				class="button field is-danger"
				@click="deleteRun()"
				:disabled="!selected">
				<b-icon icon="close" />
				<span>Delete selected</span>
			</button>
			<b-select
				v-model="perPage"
				:disabled="!pagination">
				<option value="10">10 per page</option>
				<option value="20">20 per page</option>
				<option value="30">30 per page</option>
				<option value="40">40 per page</option>
			</b-select>
			<div class="control is-flex">
				<b-switch v-model="pagination">Pagination</b-switch>
			</div>
		</b-field>
		<b-table
			:data="runData"
			:columns="columns"
			:striped="true"
			:selected.sync="selected"
			:loading="isLoading"
			:paginated="pagination"
			:per-page="perPage"
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
				<b-field grouped>
					<b-field
						:label="'Player ' + (i + 1)"
						v-for="(player, i) in props.row.runData.players"
						:key="player.displayName">
						<b-input v-model="props.row.runData.players[i].displayName" />
					</b-field>
				</b-field>
				<button
					class="button is-success is-medium"
					@click="saveEdit(props.row.runData)">Save edits</button>
			</template>
		</b-table>
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
			pagination: true,
			perPage: 10,
			isLoading: true,
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
		deleteRun() {
			this.$dialog.confirm({
				title: 'Deleting run',
				message: 'Are you sure you want to delete this run? This action cannot be undone.',
				confirmText: 'Delete run',
				type: 'is-danger',
				hasIcon: false,
				onConfirm: () => {
					this.$http.delete(`/run/delete/${this.selected.runData.runID}`)
						.then(() => {
							this.$toast.open('Run succesfully deleted!');
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
					game: `${e.gameInfo.gameName} (${e.gameInfo.releaseYear})`,
					estimate: e.runInfo.estimate,
					player: e.players.map(p => p.displayName).join(', '),
					platform: e.runInfo.platform,
					category: e.runInfo.category,
				});
			}
			this.isLoading = false;
		},
		saveEdit(run) {
			this.$http.patch(`/run/update/${run.runID}`, run)
				.then((r) => {
					if (!r.ok) {
						this.$toast.open({
							message: 'Request status not okay. Error:',
							position: 'is-bottom',
							type: 'is-danger',
						});
					}
					this.$toast.open({
						message: 'Updated!',
						position: 'is-bottom',
						type: 'is-success',
					});
				});
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
.input-group-header {
	margin-bottom: 5px;
}
.test {
	width: auto !important;
}
</style>
