<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
	title: String,
	date: String,
	_id: String,
});
const route = useRouter();

const colorLists = ref([
	"#ffab91",
	"#ffcc80",
	"#e6ee9b",
	"#e6ee9b",
	"#80deea",
	"#cf93d9",
	"#f48fb1",
	"#80cbc4",
]);

const getRandomColor = () => {
	const min = Math.ceil(0);
	const max = Math.floor(colorLists.value.length);
	return colorLists.value[Math.floor(Math.random() * (max - min)) + min]; //Максимум не включается, минимум включается
};
const goToNote = (id: string) => {
	route.push({ path: `/note/${id}/` });
};
</script>
<template>
	<div>
		<div
			class="item"
			:style="`background-color:${getRandomColor()}`"
			@click="goToNote(props._id?.toString())"
		>
			{{ props.title }}<br /><br />
			<div class="item-date">{{ new Date(props.date).toDateString() }}</div>
			<br />
			<div class="item-date">1{{ props._id }}</div>
		</div>
	</div>
</template>
<style scoped>
.item {
	/* Masonry bricks or child elements */
	background-color: #eee;
	display: inline-block;
	padding: 15px;
	text-align: left;
	margin-bottom: 5px;
	width: 100%;
	/* border: 1px solid black; */
	border-radius: 5pt;
	box-sizing: border-box;
	color: black;
}
.item-date {
	float: right;
	color: rgba(0, 0, 0, 0.664);
}
</style>
