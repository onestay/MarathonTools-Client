<template>
	<div>
		<h1 class="title has-text-centered">{{data.timer.formatted}}</h1>
		<div class="has-text-centered">
			<div v-if="data.timer.state === 0">
				<button class="button is-warning is-medium">Pause</button>
				<button class="button is-danger is-medium">Finish</button>
			</div>
			<div v-else-if="data.timer.state === 1">
				<button class="button is-danger is-medium">Reset</button>
				<button class="button is-info is-medium">Resume</button>
			</div>
			<div v-else-if="data.timer.state === 2">
				<button class="button is-success is-medium">Start</button>
			</div>
			<div v-else-if="data.timer.state === 3">
				<button class="button is-danger is-medium">Reset</button>
			</div>
			<div v-else>
				<span>ERROR INVALID TIMER STATE</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['data'],
};
</script>

<style>

</style>
