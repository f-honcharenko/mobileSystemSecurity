<route lang="yaml">
meta:
  title: "[SN] Profile"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotyf from "../../composable/useNotyf";
import { AuthService, UserModel } from "/@src/service/auth";

const route = useRoute();
const router = useRouter();
const notyf = useNotyf();

const authService = new AuthService();

const userData = ref<UserModel>(new UserModel());

const loadUserDate = async () => {
	try {
		const data = await authService.get();
		userData.value.state = data;
		console.log(userData.value);
	} catch (error) {
		notyf.error("Error while loading user data");
	}
};
const handleLogout = () => {
	try {
		const data = authService.logout();
		notyf.success("Successfully logout");
		handleBack();
	} catch (error) {
		notyf.error("Error while logout");
	}
};
const handleChangePassword = async () => {
	try {
		const oldPassword = prompt("Enter your old passwrod");
		const newPassword = prompt("Enter your new passwrod");
		if (oldPassword && newPassword) {
			const data = await authService.changePassword(
				String(oldPassword),
				String(newPassword)
			);
			notyf.success("Successfully changed.");
		} else {
			notyf.error("Incorrect data", 2000);
		}
	} catch (error) {
		notyf.error("Error while loading user data.");
	}
};
const handleBack = () => {
	router.push({ path: "/" });
};
onBeforeMount(() => {
	loadUserDate();
});
</script>
<template>
	<div>
		<div class="header">
			<div class="back-btn btn" @click="handleBack">ᐸ</div>
		</div>
		<br />
		<br />
		<div>
			<div class="title-div _div">Login: {{ userData.state.login }}</div>
			<div class="date-div _div">
				Register date: {{ new Date(userData.state.createdAt).toDateString() }}
			</div>
			<br />
			<div class="chng-btn _div btn" @click="handleChangePassword">
				Change password
			</div>
		</div>
		<div>
			<div class="leave-btn btn" @click="handleLogout">Logout</div>
		</div>
	</div>
</template>
<style scoped>
.btn {
	border-radius: 4pt;
	background-color: #3b3b3b;
	padding: 10px 15px 10px 15px;
	margin: 20px;
	font-weight: bold;
}
.back-btn {
	float: left;
}
.leave-btn {
	float: right;
}
._div {
	color: #fefefe;
	margin: 0px 0px 20px 40px;
}
.title-div {
	font-weight: bold;
}
.date-div {
	color: #929292;
	margin: 0px 0px 20px 40px;
}
.chng-btn {
	float: left;
}
</style>
