<route lang="yaml">
meta:
  title: "[SN] Note"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const noteID = ref(Number(route.params.id) || 0);
const noteDate = ref({});

const loadNoteDate = async (id: number) => {
	try {
	} catch (error) {
		alert("Error");
	}
};
const handleEditTitle = async () => {
	try {
		alert("EditTitle");
	} catch (error) {
		alert("Error");
	}
};
const handleDelteNote = async () => {
	try {
		alert("DeleteNote");
	} catch (error) {
		alert("Error");
	}
};
const handleSaveNote = async () => {
	try {
		alert("SaveNote");
	} catch (error) {
		alert("Error");
	}
};
onBeforeMount(() => {
	loadNoteDate(noteID.value);
});
</script>
<template>
	<div>
		<title>[SN] Note</title>
		<Header />
		<div>
			<div class="title" @click="handleEditTitle">Title: date &#9998;</div>
			<div>Created: date</div>
			<div>Updated: date</div>
			<br />
			<textarea class="txt-area"></textarea><br /><br />
			<button class="sv-btn" @click="handleSaveNote">Save</button>
			<button class="dl-btn" @click="handleDelteNote">Delete</button>
		</div>
		<Footer />
	</div>
</template>
<style scoped>
.sv-btn {
	float: right;
}
.dl-btn {
	float: left;
}

.txt-area {
	width: 100%;
	height: 200px;
	margin: 0px;
	padding: 0px;
	float: center;
}

.title {
	cursor: pointer;
}
</style>
