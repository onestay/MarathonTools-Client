<template>
	<div>
		<div v-html="dAmount" />
		<hr>
		<div>
			<p>Latest three donations:</p>
			<ul
				li
				v-for="donation in donations"
				:key="donation.name">
				<li>{{ donation.user }} </li>
				<li>{{ donation.amount }}€</li>
				<li>{{ donation.message }}</li>
			</ul>
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
			donations: [],
		};
	},
	computed: {
		dAmount() {
			if (this.data.donationInfo.amountOld === -1) {
				return 'Donations are either not enabled or updating';
			}
			return `Current donation amount: <strong>${this.data.donationInfo.amountNew}€</strong>`;
		},
	},
	created() {
		this.fetchData();
	},
	methods: {
		fetchData() {
			this.$http.get('/donations/all')
				.then((res) => {
					this.donations = res.body.donations.slice(0, 3);
				});
		},
	},
};
</script>

