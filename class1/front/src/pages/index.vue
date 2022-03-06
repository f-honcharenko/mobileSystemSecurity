<route lang="yaml">
meta:
  title: "Main Page"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import useNotyf from "../composable/useNotyf";

const notyf = useNotyf();
const router = useRouter();
const isLogged = ref(true);
const notesList = ref([
	{ id: 1, title: "Title 1sdfsdfsdfsdf", date: "11.01.2003" },
	{ id: 2, title: "Title 2", date: "11.01.2003" },
	{
		id: 3,
		title: "Title 3sdfsdfsdfsdfsdf sdfsfsdfsdf sdf",
		date: "11.01.2003",
	},
	{ id: 4, title: "Title 4sdfsdfdsf", date: "11.01.2003" },
	{ id: 5, title: "Title 5sdfsdfsf", date: "11.01.2003" },
	{ id: 6, title: "Title 6sdf", date: "11.01.2003" },
	{ id: 7, title: "Title 7sdfsdfsdfdsf sdfsdfsdf sdf", date: "11.01.2003" },
	{ id: 8, title: "Title 8", date: "11.01.2003" },
]);

const fetchUserData = async () => {
	try {
	} catch (error) {}
};
const handleDeleteNote = async (id: number) => {
	try {
		notyf.success("Hello", 2000);

		// alert("Delete note");
	} catch (error) {}
};
const handleChangePassword = async () => {
	try {
		alert("Change password");
	} catch (error) {}
};
const handleCreateNote = async () => {
	try {
		router.push({ path: "/note/create/" });
	} catch (error) {
		notyf.error("Error.");
	}
};

onBeforeMount(() => {
	fetchUserData();
});
</script>
<template>
	<div>
		<div v-if="isLogged" id="notes">
			<h2>Notes:</h2>
			<div class="masonry">
				<Card
					v-for="note in notesList"
					:key="note.id"
					:title="note.title"
					:date="note.date"
					:_id="note.id"
				/>
			</div>
			<div class="crt-btn" @click="handleCreateNote">
				<div class="crt-btn-content">+</div>
			</div>
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
<style>
#removeBtn {
	float: right;
	cursor: pointer;
}
.note {
	color: black;
	cursor: pointer;
}
.crt-btn {
	width: 40px;
	height: 40px;
	background-color: darkblue;
	position: fixed;
	right: 20px;
	bottom: 10px;
	color: white;
	font-weight: 900;
	border-radius: 90pt;
	text-align: center;
}
.crt-btn-content {
	margin: 0;
	position: absolute; /* 2 */
	top: 46%; /* 3 */
	right: 50%; /* 3 */
	transform: translate(+50%, -50%); /* 4 */
}
.masonry {
	/* Masonry container */
	column-count: 2;
	column-gap: 5px;
}
</style>
