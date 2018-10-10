<template>
	<section class="hero">
		<div class="hero-head"><mt-header /></div>
		<hr>
		<div class="hero-body">
			<div class="container">
				<div class="columns">
					<div class="column is-3">
						<aside class="menu">
							<p class="menu-label">General</p>
							<ul class="menu-list">
								<li><router-link
									to="/dashboard/config/general"
									active-class="is-active">General</router-link></li>
								<li><router-link
									to="/dashboard/config/runs"
									active-class="is-active">Runs</router-link></li>
								<li><router-link
									to="/dashboard/config/social"
									active-class="is-active">Social</router-link></li>
							</ul>
						</aside>
					</div>
					<div class="column">
						<router-view
							:data="data" />
					</div>
				</div>
			</div>
		</div>
	</section>
</template>


<script>
import Header from './Header.vue';

export default {
	components: {
		'mt-header': Header,
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
