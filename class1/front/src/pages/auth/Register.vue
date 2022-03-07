<route lang="yaml">
meta:
  title: "[SN] Login"
</route>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import useNotyf from "../../composable/useNotyf";
import { AuthService, UserModel } from "/@src/service/auth";

const router = useRouter();
const notyf = useNotyf();

const authService = new AuthService();

const userData = ref<UserModel>(new UserModel());

const handleRegister = async () => {
	try {
		if (userData.value.password == userData.value.passwordConf) {
			const data = await authService.register(userData.value);
			notyf.success("Successfully registered", 2000);
			handleBack();
		} else {
			notyf.error("Passwords do not match", 2000);
		}
	} catch (error) {
		console.log(error);
		notyf.error("Error while register", 2000);
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
			<input
				type="text"
				class="login-input inp"
				placeholder="Login"
				v-model="userData.login"
			/><br />
			<input
				type="text"
				class="password-input inp"
				placeholder="Password"
				v-model="userData.password"
			/><br />
			<input
				type="text"
				class="password-input inp"
				placeholder="Confirm Password"
				v-model="userData.passwordConf"
			/>
		</div>
		<div>
			<div class="btn login-btn" @click="handleRegister">Register</div>
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
