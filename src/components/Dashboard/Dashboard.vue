<template>
	<div>
		<section class="hero is-fullheight">
			<div class="hero-head"><mt-header></mt-header></div>
			<div class="hero-body">
				<div class="container">
					<div class="tile is-ancestor">
						<div class="tile is-vertical is-parent">
							<div class="tile is-child box is-primary">

							</div>
							<div class="tile is-child box">

							</div>

						</div>
						<div class="tile is-parent">
							<div class="tile is-child">
								<mt-runmanager :data="data"></mt-runmanager>
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

export default {
	components: {
		'mt-header': Header,
		'mt-runmanager': RunManager,
	},
	props: ['data'],
};
</script>

<style module>
</style>
