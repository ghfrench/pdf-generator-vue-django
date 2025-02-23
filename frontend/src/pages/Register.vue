<script setup lang="ts">
import { ref } from 'vue';
import { getCSRFToken } from '../store/auth';
import { useRouter } from 'vue-router';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { UserPen } from 'lucide-vue-next';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import ErrorMessage from '../components/ErrorMessage.vue';
import RequiredTag from '../components/RequiredTag.vue';

const router = useRouter();

const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

async function register() {
	try {
		const response = await fetch('http://localhost:8000/api/register',
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
			success.value = 'Registration successful! Please log in.';
			setTimeout(() => {
				router.push('/login');
			}, 1000);
		} else {
			error.value = data.error || 'Registration failed';
		}
	} catch (err) {
		error.value = 'An error occurred during registration: ' + err;
	}
}
</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen">
		<form @submit.prevent="register">
			<Card class="w-lg h-max">
				<CardHeader>
					<CardTitle class="flex items-center gap-x-2">
						<UserPen />
						Register
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex flex-col space-y-1.5">
						<Label htmlFor="name">
							Email
							<RequiredTag />
						</Label>
						<Input placeholder="Email" v-model="email" id="email" type="text" required />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label htmlFor="name">
							Password
							<RequiredTag />
						</Label>
						<Input placeholder="Password" v-model="password" id="password" type="password" required />
					</div>
					<ErrorMessage :message="error" />
					<ErrorMessage :message="success" />
				</CardContent>
				<CardFooter class="block space-y-2">
					<Button type="submit">Register</Button>
					<p class="text-center">
						Already have an account?
						<router-link to="/login" class="text-sky-600">Login</router-link>
					</p>
				</CardFooter>
			</Card>
		</form>
	</div>
</template>
