<script setup lang="ts">
import { ref, watch } from 'vue';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { PDFDocument } from 'pdf-lib';
import { FileDiff, Save, ScanEye, SquarePlus, ListPlus } from 'lucide-vue-next';
import { templateBuilder } from '../utils/templateBuilder';
import { type CustomTemplate, type RectangleElement, type TextElement } from '../types/types';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();

const pdfInfo = ref('');
const selectedTemplateId = ref<number | null>(null);
const template = ref<CustomTemplate>({
	name: 'template 1',
	id: 1,
	elements: []
});

watch(selectedTemplateId, (newSelectedTemplateId) => {
	if (newSelectedTemplateId) {
		const selectedTemplate = authStore.templates.find((temp: any) => temp.id === newSelectedTemplateId);
		template.value = { ...selectedTemplate };
	}
});

function addTextElement() {
	const newElement: TextElement = {
		type: 'text',
		text: '',
		x: 0,
		y: 0,
		size: 10,
		colorRed: 0,
		colorGreen: 0,
		colorBlue: 0,
		maxWidth: 612,
		lineHeight: 0,
	};
	template.value.elements.push(newElement);
}

function addRectangleElement() {
	const newElement: RectangleElement = {
		type: 'rectangle',
		x: 0,
		y: 0,
		width: 0,
		height: 0,
		colorRed: 0,
		colorGreen: 0,
		colorBlue: 0,
		borderColorRed: 0,
		borderColorGreen: 0,
		borderColorBlue: 0,
		borderWidth: 0,
	};
	template.value.elements.push(newElement);
}

async function createPdf() {
	const pdfDoc = await PDFDocument.create();
	const page = pdfDoc.addPage([612, 792]);

	await templateBuilder(page, template.value.elements);

	const pdfBytes = await pdfDoc.save();

	return pdfBytes;
}

async function previewPdf() {
	const pdfBytes = await createPdf();

	const blob = new Blob([pdfBytes], { type: "application/pdf" });
	const docUrl = URL.createObjectURL(blob);
	pdfInfo.value = docUrl;
};

const handleNumberInput = (element: Record<string, any>, key: string, event: Event) => {
	const value = (event.target as HTMLInputElement).value;
	element[key] = value === ""
		? 0
		: key.toLowerCase().includes('color') && Number(value) > 255
			? 255
			: Number(value);
};

async function saveTemplate() {
	try {
		await authStore.saveTemplate(template.value);
	} catch (error) {
		console.error(error);
	}
}
</script>

<template>
	<div class="w-full h-full flex justify-evenly items-center gap-x-10 p-10">
		<Card class="w-2xl h-full flex flex-col">
			<CardHeader class="shrink-0 border-b border-neutral-200/50">
				<CardTitle class=" flex items-center gap-x-2">
					<FileDiff />
					Template Editor
				</CardTitle>
				<div class="flex flex-col space-y-1.5">
					<Label htmlFor="template">Template</Label>
					<Select v-model="selectedTemplateId">
						<SelectTrigger class="!font-normal !text-base">
							<SelectValue placeholder="Select a template" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem v-for="t in authStore.templates" :value="t.id ?? null" :key="t.id">
									{{ t.name }}
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div>
					<Label>Name</Label>
					<Input v-model="template.name" />
				</div>
				<div>
					<Label>Id</Label>
					<Input v-model.number="template.id" type="number" />
				</div>
			</CardHeader>
			<CardContent class="flex-1 overflow-auto p-6">
				<div v-for="element in template.elements">
					<div v-for="property in Object.keys(element)" :key="property">
						<div v-if="element.type === 'text' && property !== 'type'">
							<Label>{{ property }}</Label>
							<div v-if="typeof (element as TextElement)[property as keyof TextElement] === 'number'">
								<Input v-model.number="(element as TextElement)[property as keyof TextElement]"
									type="number" @input="handleNumberInput(element, property, $event)" />
							</div>
							<div v-else>
								<Input v-model="(element as TextElement)[property as keyof TextElement]" />
							</div>
						</div>
						<div v-if="element.type === 'rectangle' && property !== 'type'">
							<Label>{{ property }}</Label>
							<div
								v-if="typeof (element as RectangleElement)[property as keyof RectangleElement] === 'number' && property.toLowerCase().includes('color')">
								<Input
									v-model.number="(element as RectangleElement)[property as keyof RectangleElement]"
									type="number" :max="255" @input="handleNumberInput(element, property, $event)" />
							</div>
							<div
								v-else-if="typeof (element as RectangleElement)[property as keyof RectangleElement] === 'number'">
								<Input
									v-model.number="(element as RectangleElement)[property as keyof RectangleElement]"
									type="number" @input="handleNumberInput(element, property, $event)" />
							</div>
							<div v-else>
								<Input v-model="(element as RectangleElement)[property as keyof RectangleElement]" />
							</div>
						</div>
					</div>
					<div class="width-full h-px bg-neutral-200/50 my-8" />
				</div>

			</CardContent>
			<CardFooter class="shrink-0 flex justify-between pt-6 border-t border-neutral-200/50">
				<div class="space-x-2">
					<Button variant="outline" @click="addTextElement">
						<ListPlus />
						Add Text
					</Button>
					<Button variant="outline" @click="addRectangleElement">
						<SquarePlus />
						Add Rectangle
					</Button>
				</div>
				<div class="space-x-2">
					<Button @click="previewPdf">
						<ScanEye />
						Preview
					</Button>
					<Button @click="saveTemplate">
						<Save />
						Save
					</Button>
				</div>
			</CardFooter>
		</Card>
		<iframe v-if="pdfInfo !== ''" class='w-7xl h-full rounded-xl' title="test-frame" :src="pdfInfo" />
		<div v-else
			class='w-7xl h-full border-4 text-neutral-200/50 text-xl rounded-xl border-dashed flex items-center justify-center'>
			Preview will be shown here
		</div>
	</div>
</template>
