<script setup lang="ts">
import { ref } from 'vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PDFDocument } from 'pdf-lib';
import { Download, Factory, ScanEye, Upload } from 'lucide-vue-next';
import RequiredTag from './RequiredTag.vue';
import ErrorMessage from './ErrorMessage.vue';
import { useAuthStore } from '../store/auth';
import staticTemplates from '../configs/staticTemplates';
import { templateBuilder } from '../utils/templateBuilder';

const authStore = useAuthStore();

const name = ref('');
const company = ref('');
const title = ref('');
const selectedTemplateId = ref<number | null>(null);
defineExpose({
	selectedTemplateId // Expose the ref itself
});
const pdfInfo = ref('');

const errors = ref({
	name: '',
	company: '',
	title: '',
	template: ''
});

function validateFields() {
	let valid = true;

	// Validate Name
	if (!name.value) {
		errors.value.name = 'Name is required';
		valid = false;
	} else {
		errors.value.name = '';
	}

	// Validate Company
	if (!company.value) {
		errors.value.company = 'Company is required';
		valid = false;
	} else {
		errors.value.company = '';
	}

	// Validate Title
	if (!title.value) {
		errors.value.title = 'Title is required';
		valid = false;
	} else {
		errors.value.title = '';
	}

	// Validate Template
	if (!selectedTemplateId.value) {
		errors.value.template = 'Template is required';
		valid = false;
	} else {
		errors.value.template = '';
	}

	return valid;
};

async function createPdf() {
	const pdfDoc = await PDFDocument.create();
	const page = pdfDoc.addPage([612, 792]);

	if (typeof selectedTemplateId.value === 'number' && selectedTemplateId.value < 0) {
		const applyTemplate = staticTemplates.find((staticTemplate: any) => staticTemplate.id === selectedTemplateId.value)?.applyTemplate;
		if (applyTemplate) {
			await applyTemplate(page, { name: name.value, company: company.value, title: title.value });
		}
	} else {
		const elements = authStore.templates.find((template: any) => template.id === selectedTemplateId.value)?.elements;

		if (elements) {
			await templateBuilder(page, elements, { name: name.value, company: company.value, title: title.value });
		}
	}

	const pdfBytes = await pdfDoc.save();

	return pdfBytes;
}

async function previewPdf() {
	if (!validateFields()) {
		return;
	}

	const pdfBytes = await createPdf();

	const blob = new Blob([pdfBytes], { type: "application/pdf" });
	const docUrl = URL.createObjectURL(blob);
	pdfInfo.value = docUrl;
};

async function downloadPdf() {
	if (!validateFields()) {
		return;
	}

	const pdfBytes = await createPdf();

	// Convert Uint8Array to Blob
	const blob = new Blob([pdfBytes], { type: 'application/pdf' });

	// Create a temporary URL and trigger the download
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = title.value;
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
};

async function uploadPdf() {
	if (!validateFields()) {
		return;
	}

	const pdfBytes = await createPdf();

	const blob = new Blob([pdfBytes], { type: 'application/pdf' });
	const formData = new FormData();
	formData.append("file", blob, `${title.value || "document"}.pdf`);

	await authStore.uploadFile(formData);
};
</script>

<template>
	<div class="w-full h-full flex justify-evenly items-center gap-x-10 p-10">
		<Card class="w-2xl h-max" data-test="pdf-generator-card">
			<CardHeader data-test="pdf-generator-card-header">
				<CardTitle class="flex items-center gap-x-2" data-test="pdf-generator-card-title">
					<Factory />
					PDF Generator
				</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4" data-test="pdf-generator-card-content">
				<div class="flex flex-col space-y-1.5">
					<Label htmlFor="name">
						Name
						<RequiredTag />
					</Label>
					<Input placeholder="Name" v-model="name" data-test="name-input" />
					<ErrorMessage :message="errors.name" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label htmlFor="company">
						Company
						<RequiredTag />
					</Label>
					<Input placeholder="Company" maxlength="30" v-model="company" data-test="company-input" />
					<ErrorMessage :message="errors.company" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label htmlFor="title">
						Document Title
						<RequiredTag />
					</Label>
					<Input placeholder="Document Title" v-model="title" data-test="title-input" />
					<ErrorMessage :message="errors.title" />
				</div>
				<div class="flex flex-col space-y-1.5">
					<Label htmlFor="template">
						Template
						<RequiredTag />
					</Label>
					<Select v-model="selectedTemplateId">
						<SelectTrigger class="!font-normal !text-base">
							<SelectValue placeholder="Select a template" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem v-for="staticTemplate in staticTemplates" :value="staticTemplate.id"
									:key="staticTemplate.id">
									{{ staticTemplate.name }}
								</SelectItem>
								<SelectItem v-for="templateObj in authStore.templates" :value="templateObj.id"
									:key="templateObj.id">
									{{ templateObj.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
					<ErrorMessage :message="errors.template" />
				</div>
			</CardContent>
			<CardFooter class="flex justify-between" data-test="pdf-generator-card-footer">
				<Button @click="previewPdf" data-test="preview-button">
					<ScanEye />
					Preview
				</Button>
				<Button @click="downloadPdf" data-test="download-button">
					<Download />
					Download
				</Button>
				<Button @click="uploadPdf" data-test="upload-button">
					<Upload />
					Upload
				</Button>
			</CardFooter>
		</Card>
		<iframe v-if="pdfInfo !== ''" class='w-7xl h-full rounded-xl' title="test-frame" :src="pdfInfo" />
		<div v-else data-test="pdf-preview-placeholder"
			class='w-7xl h-full border-4 text-neutral-200/50 text-xl rounded-xl border-dashed flex items-center justify-center'>
			Preview will be shown here
		</div>
	</div>
</template>
