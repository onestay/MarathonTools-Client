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
						v-for="(value, key) in data.checklistItems"
						:key="key"
						class="field">
						<b-checkbox
							v-model="data.checklistItems[key]"
							@input="updateChecklist(key)">{{ key }}</b-checkbox>
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
	},
};
</script>
