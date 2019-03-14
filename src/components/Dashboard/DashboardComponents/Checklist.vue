<template>
	<div>
		<b-collapse class="card">
			<div
				slot="trigger"
				slot-scope="props"
				class="card-header">
				<p class="card-header-title">
					Checklist
				</p>
				<a class="class-header-icon">
					<b-icon :icon="props.open ? 'menu-down' : 'menu-up'"/>
				</a>
			</div>
			<div class="card-content">
				<div class="content">
					<div
						v-for="(item) in data.checklistItems"
						:key="item.key">

						<label class="checkbox">
							<input
								:checked="item.done"
								type="checkbox"
								@click="updateChecklist(item.key)"
							>
							{{ item.key }}
						</label>
					</div>
					<div v-if="data.checklistItems.length === 0">
						<i>Go to Config > Checklist to add checklist items.</i>
					</div>
				</div>
			</div>
		</b-collapse>
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
		updateChecklist(key) {
			this.$http.put(`checklist/toggle?item=${key}`);
		},
		nothing() {

		},
	},
};
</script>
