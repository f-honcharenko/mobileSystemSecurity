<route lang="yaml">
meta:
  title: "Main Page"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";

import useNotyf from "../composable/useNotyf";
import { useUserSession } from "../composable/useSession";
import { NoteService, NoteModel } from "../service/note";

const notyf = useNotyf();
const router = useRouter();
const session = useUserSession();

const noteSetvice = new NoteService();

const isLogged = ref(session.isLoggedIn || false);
const notesList = ref<Array<NoteModel>>([]);

const fetchUserNotes = async () => {
	try {
		const data = await noteSetvice.all();
		notesList.value = data.list;
		console.log(data);
	} catch (error) {
		notyf.error("Error loading notes", 2000);
	}
};
const handleCreateNote = async () => {
	try {
		router.push({ path: "/note/create/" });
	} catch (error) {
		notyf.error("Error.");
	}
};

const handleLogin = () => {
	router.push({ path: `/auth/login/` });
};
const handleRegister = () => {
	router.push({ path: `/auth/register/` });
};
const handleProfile = () => {
	router.push({ path: `/auth/profile/` });
};
onBeforeMount(() => {
	if (isLogged.value) {
		fetchUserNotes();
	}
});
</script>
<template>
	<div>
		<div v-if="isLogged" id="notes">
			<div>
				<h1 class="welcome-title-div">Notes:</h1>
				<div class="profile-btn btn" @click="handleProfile">Profile</div>
			</div>
			<div class="masonry">
				<Card
					v-for="note in notesList"
					:key="note._id"
					:title="note.title"
					:date="note.createdAt"
					:_id="note._id"
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
				<div class="btn" @click="handleLogin">Login</div>
				<div class="btn" @click="handleRegister">Register</div>
			</div>
		</div>
	</div>
</template>
<style>
#removeBtn {
	float: right;
	cursor: pointer;
}
#notes {
	overflow-y: visible !important;
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
	overflow-y: visible !important;
	column-count: 2;
	column-gap: 5px;
}
.btn {
	border-radius: 4pt;
	background-color: #3b3b3b;
	padding: 10px 15px 10px 15px;
	margin: 20px;
	font-weight: bold;
}
.profile-btn {
	float: right;
}
.welcome-title-div {
	/* font-weight: bold; */
	float: left;
	margin: 20px;
}
</style>
