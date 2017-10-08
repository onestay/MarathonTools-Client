<template>
	<div>
		<nav class="navbar is-dark" role="navigation">
			<div class="navbar-brand container">
				<div class="navbar-item">{{fullName}}</div>
				<router-link class="navbar-item" to="/dashboard"
				active-class="is-active" exact>Dashboard</router-link>
				<div class="navbar-item has-dropdown is-hoverable">
					<router-link class="navbar-link" to="/config"
					active-class="is-active">Config</router-link>
					<div class="navbar-dropdown">
						<router-link class="navbar-item" to="/dashboard/config/general">General</router-link>
						<router-link class="navbar-item" to="/dashboard/config/runs">Runs</router-link>
						<router-link class="navbar-item" to="/dashboard/config/social">Social</router-link>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import { name, version } from '../../../package.json';

export default {
	data() {
		return {
			fullName: `${name} - v${version}`,
		};
	},
};
</script>

