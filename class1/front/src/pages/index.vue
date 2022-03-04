<route lang="yaml">
meta:
  title: "Welcome Page"
</route>
<script setup lang="ts"></script>
<template>
	<div>
		<Header />
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
</template>
