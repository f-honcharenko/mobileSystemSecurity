<route lang="yaml">
meta:
  title: "[SN] Login"
</route>
<script setup lang="ts">
import { ref } from "vue";

const handleLogin = async () => {
	try {
		alert("Succsess Login");
	} catch (error) {
		alert("Error");
	}
};
</script>
<template>
	<div>
		<title>[SN] Login</title>
		<Header />
		<div>
			<label for="lgn-input-login">Login:</label>
			<input type="text" id="lgn-input-login" />
			<br />
			<label for="lgn-input-password">Password:</label>
			<input type="text" id="lgn-input-password" />
			<br />
			<button @click="handleLogin">Login</button>
		</div>
		<Footer />
	</div>
</template>
