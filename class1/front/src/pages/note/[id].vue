<route lang="yaml">
meta:
  title: "[SN] Note"
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

const loadNoteDate = async (id: number) => {
	try {
	} catch (error) {
		notyf.error("Error while loading note data.");
	}
};

const handleEditNote = (id: number) => {
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
			<div class="title-div _div">Title</div>
			<!-- <textarea class="title-textarea" placeholder="Title" spellcheck="false" /> -->
			<div class="date-div _div">11.01.2003</div>
			<div class="content-div _div">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec
				ullamcorper tellus. Ut a sem at eros pretium pretium id a magna. Integer
				quis ultrices ante, ac blandit nisi. Donec ultricies massa quis tellus
				commodo vestibulum sodales et justo. Curabitur et facilisis mi, eu
				condimentum dolor. Duis aliquet suscipit dignissim. Nam suscipit, elit
				in luctus semper, ipsum eros rutrum tellus, quis mattis enim lorem vitae
				ante. Proin ut nisl pellentesque, ornare turpis ut, malesuada lorem.
				Phasellus at tortor dictum, sodales velit sed, rhoncus odio. Vivamus
				eget convallis urna. Donec vel nibh non risus aliquet tempor vel vel
				turpis. Sed quis porta dui. Phasellus auctor suscipit erat eu mattis.
				Suspendisse vel sodales erat, ac posuere lacus. Nulla scelerisque, eros
				sed laoreet ultricies, enim lacus molestie nunc, ut dictum sapien elit
				nec quam. Donec mollis vel quam in rutrum. Mauris non lobortis nulla.
				Nulla id egestas purus. Duis sit amet venenatis neque, a rhoncus neque.
				Quisque quis gravida nisl. Quisque quis quam eget metus tincidunt
				aliquam vel eu nibh. Curabitur vitae sem euismod velit faucibus commodo.
				Nulla convallis urna lacus, ac sodales enim ultricies et. Pellentesque
				habitant morbi tristique senectus et netus et malesuada fames ac turpis
				egestas.
			</div>
			<!-- <textarea
				class="content-textarea"
				placeholder="Type something..."
				spellcheck="false"
			/> -->
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
