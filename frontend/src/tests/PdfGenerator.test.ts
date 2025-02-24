
// @vitest-environment happy-dom

import { beforeEach, describe, expect, test, vi, it } from 'vitest';
import PdfGenerator from '../components/PdfGenerator.vue';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

describe('PdfGenerator', () => {
	beforeEach(() => {
		// creates a fresh pinia and makes it active
		// so it's automatically picked up by any useStore() call
		// without having to pass it to it: `useStore(pinia)`
		setActivePinia(createPinia());
	});

	test('should render', () => {
		const wrapper = mount(PdfGenerator);

		expect(wrapper.find('button').exists()).toBe(true);

		const text = wrapper.text();

		// static text
		expect(text).toContain('PDF Generator');
		expect(text).toContain('Name');
		expect(text).toContain('Company');
		expect(text).toContain('Document Title');
		expect(text).toContain('Template');
		expect(text).toContain('Preview');
		expect(text).toContain('Download');
		expect(text).toContain('Upload');
		const count = (text.match(/\*/g) || []).length;
		expect(count).toBe(4);

		// icons
		expect(wrapper.find('.lucide-factory-icon').exists()).toBe(true);
		expect(wrapper.find('.lucide-scan-eye-icon').exists()).toBe(true);
		expect(wrapper.find('.lucide-download-icon').exists()).toBe(true);
		expect(wrapper.find('.lucide-upload-icon').exists()).toBe(true);

		// card elements
		const PdfGeneratorCard = wrapper.find('[data-test="pdf-generator-card"]');
		expect(PdfGeneratorCard.exists()).toBe(true);

		const PdfGeneratorCardHeader = wrapper.find('[data-test="pdf-generator-card-header"]');
		expect(PdfGeneratorCardHeader.exists()).toBe(true);

		const PdfGeneratorCardTitle = wrapper.find('[data-test="pdf-generator-card-title"]');
		expect(PdfGeneratorCardTitle.exists()).toBe(true);

		const PdfGeneratorCardContent = wrapper.find('[data-test="pdf-generator-card-content"]');
		expect(PdfGeneratorCardContent.exists()).toBe(true);

		const PdfGeneratorCardFooter = wrapper.find('[data-test="pdf-generator-card-footer"]');
		expect(PdfGeneratorCardFooter.exists()).toBe(true);
	});

	test('should render the pdf preview prior to the form being filled', () => {
		const wrapper = mount(PdfGenerator);

		const pdfPreviewPlaceholder = wrapper.find('[data-test="pdf-preview-placeholder"]');
		expect(pdfPreviewPlaceholder.exists()).toBe(true);
		expect(pdfPreviewPlaceholder.text()).toBe('Preview will be shown here');
	});

	test('should render validation messages if the user tries to preview before filling the fields', async () => {
		const wrapper = mount(PdfGenerator);

		let text = wrapper.text();

		expect(text).not.toContain('Name is required');
		expect(text).not.toContain('Company is required');
		expect(text).not.toContain('Title is required');
		expect(text).not.toContain('Template is required');

		const previewButton = wrapper.get('[data-test="preview-button"]');

		await previewButton.trigger("click");

		text = wrapper.text();

		expect(text).toContain('Name is required');
		expect(text).toContain('Company is required');
		expect(text).toContain('Title is required');
		expect(text).toContain('Template is required');
	});

	test('should render validation messages if the user tries to download before filling the fields', async () => {
		const wrapper = mount(PdfGenerator);

		let text = wrapper.text();

		expect(text).not.toContain('Name is required');
		expect(text).not.toContain('Company is required');
		expect(text).not.toContain('Title is required');
		expect(text).not.toContain('Template is required');

		const downloadButton = wrapper.get('[data-test="download-button"]');

		await downloadButton.trigger("click");

		text = wrapper.text();

		expect(text).toContain('Name is required');
		expect(text).toContain('Company is required');
		expect(text).toContain('Title is required');
		expect(text).toContain('Template is required');
	});

	test('should not render validation messages if the user fills fields and then previews', async () => {
		const wrapper = mount(PdfGenerator);

		const nameInput = wrapper.get('[data-test="name-input"]');
		const companyInput = wrapper.get('[data-test="company-input"]');
		const titleInput = wrapper.get('[data-test="title-input"]');

		await nameInput.setValue("JohnDoe");
		await companyInput.setValue("testCompany");
		await titleInput.setValue("testTitle");

		wrapper.vm.selectedTemplateId = -1; // setting this value directly because trigger click did not work on shadcn's SelectTrigger

		const previewButton = wrapper.get('[data-test="preview-button"]');

		await previewButton.trigger("click");

		const text = wrapper.text();

		expect(text).not.toContain('Name is required');
		expect(text).not.toContain('Company is required');
		expect(text).not.toContain('Title is required');
		expect(text).not.toContain('Template is required');
	});

	test('should not render validation messages if the user fills fields and then downloads', async () => {
		const wrapper = mount(PdfGenerator);

		const nameInput = wrapper.get('[data-test="name-input"]');
		const companyInput = wrapper.get('[data-test="company-input"]');
		const titleInput = wrapper.get('[data-test="title-input"]');

		await nameInput.setValue("JohnDoe");
		await companyInput.setValue("testCompany");
		await titleInput.setValue("testTitle");

		wrapper.vm.selectedTemplateId = -1; // setting this value directly because trigger click did not work on shadcn's SelectTrigger

		const downloadButton = wrapper.get('[data-test="download-button"]');

		await downloadButton.trigger("click");

		const text = wrapper.text();

		expect(text).not.toContain('Name is required');
		expect(text).not.toContain('Company is required');
		expect(text).not.toContain('Title is required');
		expect(text).not.toContain('Template is required');
	});
});
