<route lang="yaml">
meta:
  title: "[SN] Login"
</route>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import useNotyf from "../../composable/useNotyf";

const router = useRouter();
const notyf = useNotyf();

const handleLogin = async () => {
	try {
		notyf.success("Successfully loged", 2000);
		handleBack();
	} catch (error) {
		notyf.error("Error while login", 2000);
	}
};
const handleBack = () => {
	router.push({ path: `/` });
};
</script>
<template>
	<div>
		<div class="header">
			<div class="back-btn btn" @click="handleBack">ᐸ</div>
		</div>
		<div>
			<input type="text" class="login-input inp" placeholder="Login" /><br />
			<input type="text" class="password-input inp" placeholder="Password" />
		</div>
		<div>
			<div class="btn login-btn" @click="handleLogin">Login</div>
		</div>
	</div>
</template>
<style scoped>
.inp {
	color: #fcfcfc;
	border: none;
	outline: none;
	background-color: #252525;
	font-size: xx-large;
	margin: 40px;
	/* font-size: ; */
}
.login-btn {
	float: right;
}
.back-btn {
	float: left;
}
.btn {
	border-radius: 4pt;
	background-color: #3b3b3b;
	padding: 10px 15px 10px 15px;
	margin: 20px;
	font-weight: bold;
}
</style>
