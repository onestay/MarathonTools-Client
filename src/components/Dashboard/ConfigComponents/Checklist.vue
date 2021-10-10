<template>
	<div>
		<b-field>
			<b-input
				ref="add"
				v-model="item"
				placeholder="Add checklist item"
				expanded
				icon="plus"
				@keyup.native.enter="addItem"
			/>
			<p class="controll">
				<button
					class="button is-primary"
					@click="addItem"
				>
					Add
				</button>
			</p>
		</b-field>
		<div class="key-list">
			<div
				v-for="(clItem) in data.checklistItems"
				:key="clItem.key"
			>
				<a
					class="delete"
					@click="removeItem(clItem.key)"
				/>
				{{ clItem.key }}
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
			item: '',
			items: {},
		};
	},
	methods: {
		addItem() {
			this.$http.post(`checklist/add?item=${this.item}`)
				.then(() => {
					this.item = '';
					this.$refs.add.$el.children[0].focus();
				})
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Couldn\'t add checklist item',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
		removeItem(item) {
			this.$http.delete(`checklist/delete?item=${item}`)
				.catch(() => {
					this.$buefy.toast.open({
						message: 'Couldn\'t delete checklist item',
						position: 'is-bottom',
						type: 'is-danger',
					});
				});
		},
	},
};
</script>
<style scoped>
.key-list {
	margin-top: 30px;
}
</style>
