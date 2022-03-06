<route lang="yaml">
meta:
  title: "[SN] Profile"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotyf from "../../composable/useNotyf";

const route = useRoute();
const router = useRouter();
const notyf = useNotyf();

const noteID = ref(Number(route.params.id) || 0);
const noteDate = ref({});

const loadUserDate = async () => {
	try {
	} catch (error) {
		notyf.error("Error while loading user data.");
	}
};
const handleChangePassword = async (id: number) => {
	try {
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
			<div class="title-div _div">Name: {{ "Filipp" }}</div>
			<div class="date-div _div">Register date: {{ "11.01.2003" }}</div>
			<br />
			<div class="chng-btn _div btn">Change password</div>
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
