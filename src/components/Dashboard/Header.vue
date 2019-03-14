<template>
	<div>
		<nav
			class="navbar"
			role="navigation">
			<div class="navbar-brand">
				<div class="navbar-item">{{ fullName }}</div>
				<router-link
					class="navbar-item"
					to="/dashboard"
					active-class="is-active"
					exact>Dashboard</router-link>
			</div>
			<div class="navbar-start">
				<div class="navbar-item has-dropdown is-hoverable">
					<router-link
						class="navbar-link"
						to="/dashboard/config"
						active-class="is-active">Config</router-link>
					<div class="navbar-dropdown">
						<router-link
							class="navbar-item"
							to="/dashboard/config/general">General</router-link>
						<router-link
							class="navbar-item"
							to="/dashboard/config/runs">Runs</router-link>
						<router-link
							class="navbar-item"
							to="/dashboard/config/social">Social</router-link>
						<router-link
							class="navbar-item"
							to="/dashboard/config/checklist">Checklist</router-link>
					</div>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					Made by&nbsp;<a
						href="https://twitter.com/onest4y"
						target="_blank"
						rel="noopener noreferrer">Onestay</a>
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
