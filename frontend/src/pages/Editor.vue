<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';
import { Button } from '../components/ui/button/index.js';
import { Code, Factory, LogOut } from 'lucide-vue-next';
import TemplateEditor from '../components/TemplateEditor.vue';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
	await authStore.fetchUser();

	if (!authStore.isAuthenticated) {
		router.push('/login');
	}
});

async function clearTemplates() {
	try {
		await authStore.clearTemplates();
	} catch (error) {
		console.error(error);
	}
}

async function logout() {
	try {
		await authStore.logout(router);
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
	<div v-if="authStore.isAuthenticated" class="h-screen flex flex-col">
		<header class="bg-black text-white flex items-center justify-between px-4 py-2 h-14 gap-x-4">
			<Code />
			<span class="font-bold text-xl">PDF Generator</span>
			<div class="space-x-4">
				<Button @click="clearTemplates">
					Clear Templates
				</Button>
				<Button>
					<Factory />
					<router-link to="/">PDF Generator</router-link>
				</Button>
				<Button @click="logout">
					<LogOut />
					Logout
				</Button>
			</div>
		</header>
		<TemplateEditor />
	</div>
</template>
