<route lang="yaml">
meta:
  title: "Main Page"
</route>
<script setup lang="ts">
import { ref } from "vue";
import { onBeforeMount } from "@vue/runtime-core";

const isLogged = ref(false);

const fetchUserData = async () => {
	try {
	} catch (error) {}
};

onBeforeMount(() => {
	fetchUserData();
});
</script>
<template>
	<div>
		<Header />
		<div v-if="isLogged" id="notes">
			<h2>Here is your notes:</h2>
		</div>
		<div v-else id="welcome-message">
			<div>
				<h2>Please log in to access your notes.</h2>
			</div>
			<div>
				<router-link :to="{ path: '/auth/login/' }">
					<button>Login</button></router-link
				><br />

				<router-link :to="{ path: '/auth/register/' }">
					<button>Register</button></router-link
				>
			</div>
		</div>
	</div>
</template>
