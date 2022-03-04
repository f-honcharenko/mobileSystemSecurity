<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const header = ref(route.meta.title);
</script>
<template>
	<div>
		<title>{{ header }}</title>

		<router-link tag="button" :to="{ path: '/' }">
			<center>
				<h1>{{ header }}</h1>
			</center>
		</router-link>
		<hr />
	</div>
</template>
