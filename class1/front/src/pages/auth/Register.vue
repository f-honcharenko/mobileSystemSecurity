<route lang="yaml">
meta:
  title: "[SN] Register"
</route>
<script setup lang="ts">
import { ref } from "vue";

const handleRegister = async () => {
	try {
		alert("Succsess Register");
	} catch (error) {
		alert("Error");
	}
};
</script>
<template>
	<div>
		<title>[SN] Register</title>
		<Header />
		<div>
			<label for="lgn-input-login">Login:</label>
			<input type="text" id="lgn-input-login" />
			<br />
			<label for="lgn-input-password">Password:</label>
			<input type="text" id="lgn-input-password" />
			<br />
			<label for="lgn-input-password">Password(confirm):</label>
			<input type="text" id="lgn-input-password" />
			<br />
			<button @click="handleRegister">Register</button>
		</div>
	</div>
</template>
