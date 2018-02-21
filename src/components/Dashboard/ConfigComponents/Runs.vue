<template>
	<div>
		<b-table
			:data="runData"
			:columns="columns" />
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
			],
			runData: [
				{
					game: 'Portal 2', estimate: '3:23', player: 'Onestay', platform: 'PC', category: 'any%',
				},
			],
		};
	},
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
.input-group-header {
	margin-bottom: 5px;
}
.test {
	width: auto !important;
}
</style>
