<route lang="yaml">
meta:
  title: "[SN] Note"
</route>
<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotyf from "../../composable/useNotyf";

const route = useRoute();
const router = useRouter();
const notyf = useNotyf();

const noteID = ref(Number(route.params.id) || 0);
const noteDate = ref({});

const handleSaveNote = async () => {
	try {
		alert("SaveNote");
	} catch (error) {
		alert("Error");
	}
};
const handleBack = () => {
	router.push({ path: "/" });
};
</script>
<template>
	<div>
		<div class="header">
			<div class="back-btn btn" @click="handleBack">ᐸ</div>
			<div class="save-btn btn" @click="handleSaveNote">Save</div>
		</div>
		<br />
		<br />
		<div>
			<textarea class="title-textarea" placeholder="Title" spellcheck="false" />
			<textarea
				class="content-textarea"
				placeholder="Type something..."
				spellcheck="false"
			/>
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
.save-btn {
	float: right;
}
.title-textarea {
	border: none;
	background-color: #252525;
	color: #fcfcfc;
	margin: 10px 40px 10px 40px;
	width: 80%;
	float: center;
	font-size: large;
	outline: none;
	height: 50px;
	resize: none;
	overflow: hidden;
}
.content-textarea {
	border: none;
	background-color: #252525;
	color: #fcfcfc;
	margin: 0px 40px 40px 40px;
	width: 80%;
	float: center;
	font-size: larger;
	height: 250px;
	outline: none;
	resize: none;
	overflow: hidden;
}
.date-div {
	color: #929292;
	margin: 0px 0px 20px 40px;
}
</style>
