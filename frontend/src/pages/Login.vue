<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref("");

async function login() {
	await
		authStore.login(email.value, password.value, router);
	if
		(!authStore.isAuthenticated) {
		error.value = 'Login failed. Please check your;credentials.';
	}
}

function resetError() {
	error.value = "";
}
</script>

<template>
	<div class="login">
		<h1>Login</h1>
		<form @submit.prevent="login">
			<div>
				<label for="email">Email:</label>
				<input v-model="email" id="email" type="text" required @input="resetError">
			</div>
			<div>
				<label for="password">Password:</label>
				<input v-model="password" id="password" type="password" required @input="resetError">
			</div>
			<button type="submit">Login</button>
		</form>
		<p v-if="error" class="error">{{ error }}</p>
	</div>
</template>
