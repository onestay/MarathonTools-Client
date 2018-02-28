<template>
	<div>
		<router-view :data="data" />
	</div>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			default() {
				return { error: 'ERROR' };
			},
		},
	},
};
</script>

