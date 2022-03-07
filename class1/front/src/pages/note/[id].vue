<route lang="yaml">
meta:
  title: "[SN] Note"
</route>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import { useRoute, useRouter } from "vue-router";
import useNotyf from "../../composable/useNotyf";
import { NoteModel } from "../../service/note";
import { NoteService } from "/@src/service/note";

const route = useRoute();
const router = useRouter();
const notyf = useNotyf();

const noteService = new NoteService();

const noteID = ref(String(route.params.id));
const noteDate = ref<NoteModel>(new NoteModel());

const loadNoteDate = async (id: number) => {
	try {
		const data = await noteService.getNote(noteID.value);
		noteDate.value = data;
	} catch (error) {
		notyf.error("Error while loading note data.");
	}
};

const handleEditNote = (id: string) => {
	router.push({ path: `/note/edit/${id}` });
};
const handleBack = () => {
	router.push({ path: "/" });
};
onBeforeMount(() => {
	loadNoteDate(noteID.value);
});
</script>
<template>
	<div>
		<div class="header">
			<div class="back-btn btn" @click="handleBack">ᐸ</div>
			<div class="edit-btn btn" @click="handleEditNote(noteID)">✎</div>
		</div>
		<br />
		<br />
		<div>
			<!-- {{ noteDate.state }} -->
			<div class="title-div _div">{{ noteDate.title }}</div>
			<div class="date-div _div">
				{{ new Date(noteDate.createdAt).toDateString() }}
			</div>
			<div class="content-div _div">{{ noteDate.content }}</div>
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
.edit-btn {
	float: right;
}
.content-div {
	text-align: justify;
}
._div {
	color: #fefefe;
	margin: 0px 40px 20px 40px;
}
.title-div {
	font-weight: bold;
}
.date-div {
	color: #929292;
	margin: 0px 0px 20px 40px;
}
</style>
