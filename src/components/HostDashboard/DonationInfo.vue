<template>
	<div>
		<div v-html="dAmount" />
		<hr>
		<div>
			<p>Latest three donations:</p>
			<ul
				v-for="donation in donations"
				:key="donation.name"
				style="list-style-type: none;"
				li
			>
				<li> <b-icon icon="account"/> <span>{{ donation.user }}</span> </li>
				<li> <b-icon icon="currency-usd"/> {{ donation.amount }}€</li>
				<li> <b-icon icon="message-text"/> {{ donation.message }}</li>
				<hr>
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
			return `Current donation amount: <strong>${this.data.donationInfo.amountNew}$</strong>`;
		},
	},
	created() {
		this.fetchData();
		setTimeout(this.fetchData, 5000);
	},
	methods: {
		fetchData() {
			this.$http.get('donations/all')
				.then((res) => {
					this.donations = res.data.donations.slice(0, 3);
				});
		},
	},
};
</script>
