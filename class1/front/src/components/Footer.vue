<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const header = ref(route.meta.title);
</script>
<template>
	<div>
		<div id="footer">
			<a href="https://t.me/Lifipp" class="courseEnd2">©F. Honcharenko 2022</a>
		</div>
	</div>
</template>
<style scoped>
#footer {
	background-color: rgb(250, 238, 223);
	position: fixed;
	left: 0;
	bottom: 0;
	width: 100%;
	text-align: center;
}
</style>
