<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '../store/auth.js';
import { useRouter } from 'vue-router';
import PdfGenerator from '../components/PdfGenerator.vue';
import { Button } from '../components/ui/button/index.js';
import { Code, FileDiff, LogOut } from 'lucide-vue-next';

const authStore = useAuthStore();
const router = useRouter();

onMounted(async () => {
	await authStore.fetchUser();

	if (!authStore.isAuthenticated) {
		router.push('/login');
	} else {
		await authStore.fetchFiles();
	}
});

console.log(authStore.pdfList);

async function logout() {
	try {
		await authStore.logout(router);
	} catch (error) {
		console.error(error);
	}
}

function downloadPDF(pdfId: number) {
	// Create a link element
	const link = document.createElement('a');
	link.href = `http://localhost:8000/api/download/${pdfId}/`; // URL to download the PDF
	link.setAttribute('download', ''); // This attribute is necessary for the download to work
	document.body.appendChild(link);
	link.click(); // Programmatically click the link to trigger the download
	document.body.removeChild(link); // Clean up the DOM
}
</script>

<template>
	<div v-if="authStore.isAuthenticated" class="h-screen flex flex-col">
		<header class="bg-black text-white flex items-center justify-between px-4 py-2 h-14 gap-x-4">
			<div class="flex-1 text-left">
				<Code />
			</div>
			<span class="flex-1 font-bold text-xl text-center">PDF Generator</span>
			<div class="flex-1 space-x-4 text-right">

				<Button>
					<FileDiff />
					<router-link to="/editor">Template Editor</router-link>
				</Button>
				<Button @click="logout">
					<LogOut />
					Logout
				</Button>
			</div>
		</header>
		<!-- <div v-for="pdf in authStore.pdfList">
			<Button @click="authStore.downloadFile(pdf.id)">{{ pdf.file }}</Button>
		</div> -->
		<ul>
			<li v-for="pdf in authStore.pdfList" :key="pdf.id">
				<a :href="pdf.file" target="_blank">{{ pdf.file }}</a>
				<button @click="downloadPDF(pdf.id)">Download</button>
			</li>
		</ul>
		<PdfGenerator />
	</div>
</template>
