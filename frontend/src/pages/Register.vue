<script setup lang="ts">
import { ref } from 'vue';
import { getCSRFToken } from '../store/auth';
import { useRouter } from 'vue-router';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

async function register() {
	try {
		const response =
			await
				fetch('http://localhost:8000/api/register',
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'X-CSRFToken': getCSRFToken()
						},
						body:
							JSON.stringify({
								email: email.value,
								password: password.value
							}),
						credentials: 'include'
					});
		const data = await response.json();
		if (response.ok) {
			success.value = 'Registration successful! Please;log in.';
			setTimeout(() => {
				router.push('/login');
			}, 1000);
		} else {
			error.value = data.error || 'Registration failed';
		}
	} catch (err) {
		error.value = 'An error occurred during registration:' + err;
	}
}
</script>

<template>
	<div>
		<h2> Register </h2>
		<form @submit.prevent="register">
			<div>
				<label for="email"> Email: </label>
				<input v-model="email" id="email" type="email" required>
			</div>
			<div>
				<label for="password"> Password: </label>
				<input v-model="password" id="password" type="password" required>
			</div>
			<button type="submit"> Register </button>
		</form>
		<p v-if="error"> {{ error }} </p>
		<p v-if="success"> {{ success }} </p>
	</div>
</template>
