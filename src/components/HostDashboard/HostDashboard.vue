<template>
	<div>
		<div class="columns back" id="top-bar">
			<div class="column">
				<span class="text-size has-text-white">{{ data.timer.formatted }}</span>
			</div>
			<div class="column donation-text">
				<span class="text-size has-text-white">{{ data.donationInfo.amountNew }}$</span>
			</div>
		</div>
		<div class="columns">
			<div class="column">
				<iframe
					id="chat"
					frameborder="0"
					scrolling="yes"
					src="https://www.twitch.tv/embed/riotgames/chat?darkpopout"
				/>
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
	mounted() {
		document.getElementById('chat').style.height = `${document.documentElement.clientHeight - document.getElementById('top-bar').clientHeight + 120}px`;
	},
};
</script>
<style>
#chat {
	width: 100%;
}
.chat-input {
	display: none;
}
.back {
	background-image: url("./host_background.png");
	background-position: bottom;
	margin: 0 !important;
}
.donation-text {
	text-align: right;
}
.text-size {
	font-size: 4rem;
}
html {
	height: 100%;
	overflow: hidden;
}
</style>
