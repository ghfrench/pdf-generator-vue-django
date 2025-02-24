<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';
import { useRouter } from 'vue-router';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import ErrorMessage from '../components/ErrorMessage.vue';
import RequiredTag from '../components/RequiredTag.vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { LogIn } from 'lucide-vue-next';
import { Button } from '../components/ui/button';

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
		error.value = 'Login failed. Please check your credentials.';
	}
}

function resetError() {
	error.value = "";
}
</script>

<template>
	<div class="flex flex-col items-center justify-center h-screen">
		<form @submit.prevent="login">
			<Card class="w-lg h-max">
				<CardHeader>
					<CardTitle class="flex items-center gap-x-2">
						<LogIn />
						Login
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<div class="flex flex-col space-y-1.5">
						<Label htmlFor="name">
							Email
							<RequiredTag />
						</Label>
						<Input placeholder="Email" v-model="email" id="email" type="text" required
							@input="resetError" />
					</div>
					<div class="flex flex-col space-y-1.5">
						<Label htmlFor="name">
							Password
							<RequiredTag />
						</Label>
						<Input placeholder="Password" v-model="password" id="password" type="password" required
							@input="resetError" />
					</div>
					<ErrorMessage :message="error" />
				</CardContent>
				<CardFooter class="block space-y-2">
					<Button type="submit">Login</Button>
					<p class="text-center">
						Don't have an account?
						<router-link to="/register" class="text-sky-600">Register</router-link>
					</p>
				</CardFooter>
			</Card>
		</form>
	</div>
</template>
