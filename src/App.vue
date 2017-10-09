<template>
	<div>
		<b-loading :active="loading" :canCancel="false" v-if="loading"></b-loading>
		<router-view v-else  :data="data"></router-view>
	</div>
</template>

<script>
import Vue from 'vue';
import Buefy from 'buefy';

Vue.use(Buefy);

export default {
	data() {
		return {
			loading: true,
			ws: WebSocket,
			data: {
				currentRun: {},
				nextRun: {},
				prevRun: {},
				runs: {},
				runIndex: 0,
			},
		};
	},
	methods: {
		createWSConn() {
			this.ws = new WebSocket('ws://localhost:3000/ws');

			this.ws.onmessage = ((event) => {
				this.data = JSON.parse(event.data);
				this.loading = false;
			});
		},
	},
	created() {
		this.createWSConn();
	},
};
</script>

<style lang="scss">
@import "~bulma/sass/utilities/_all";
@import "~bulma";
@import "~buefy/src/scss/buefy";
</style>

