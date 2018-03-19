<template>
	<div class="donation">
		<m-cu
			:start-val="0"
			:end-val="data.donationInfo.amountNew"
			:duration="2.5"
			:options="options"
		/>
	</div>
</template>

<script>
import Countup from 'vue-countup-v2';
import { setTimeout } from 'timers';

export default {
	components: {
		'm-cu': Countup,
	},
	props: {
		data: {
			type: Object,
			default() {
				return { error: 'ERROR' };
			},
		},
	},
	data() {
		return {
			options: {
				useEasing: true,
				useGrouping: true,
				separator: '',
				decimal: '.',
				suffix: '$',
			},
		};
	},
	mounted() {
		setTimeout(() => {
			this.endVal = 1100;
		}, 5000);
	},
};
</script>


<style scoped>
html {
	background-color: #00ff00;
}
body {
	color: white !important;
	font-family: Arial, Helvetica, sans-serif;
	font-size: 50px;
}

</style>
