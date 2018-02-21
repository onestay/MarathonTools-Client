<template>
	<div>
		<section class="hero is-fullheight">
			<div class="hero-head"><mt-header /></div>
			<div class="hero-body">
				<div class="container">
					<div class="tile is-ancestor">
						<div class="tile is-vertical is-parent">
							<div class="tile is-child box is-primary">
								<mt-timer :data="data" />
							</div>
							<div class="tile is-child box">
								<mt-status :data="data" />
							</div>
						</div>
						<div class="tile is-parent">
							<div class="tile is-child">
								<mt-runmanager :data="data" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import Header from './Header.vue';
import RunManager from './DashboardComponents/RunManager.vue';
import Timer from './DashboardComponents/Timer.vue';
import Status from './DashboardComponents/Status.vue';

export default {
	components: {
		'mt-header': Header,
		'mt-runmanager': RunManager,
		'mt-timer': Timer,
		'mt-status': Status,
	},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			},
		},
	},
};
</script>
