<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
	await authStore.fetchUser();
});

async function logout() {
	try {
		await authStore.logout(router);
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
	<h1>Welcome to the home page</h1>
	<div v-if="authStore.isAuthenticated">
		<p>Hi there {{ authStore.user?.username }}!</p>
		<p>You are logged in.</p>
		<button @click="logout">Logout</button>
	</div>
	<p v-else>
		You are not logged in.
		<router-link to="/login">Login</router-link>
	</p>
</template>
