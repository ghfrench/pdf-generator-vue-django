
// @vitest-environment happy-dom

import { describe, expect, test } from 'vitest';
import PdfGenerator from '../components/PdfGenerator.vue';
import { mount } from '@vue/test-utils';

describe('PdfGenerator', () => {
	test('should render', () => {
		const wrapper = mount(PdfGenerator);

		expect(wrapper.find('button').exists()).toBe(true);

		const text = wrapper.text();

		// static text
		expect(text).toContain('PDF Generator');
		expect(text).toContain('Generate your pdf with just a few inputs');
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
		expect(wrapper.find('.lucide-file-text-icon').exists()).toBe(true);
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

		const pdfPreviewPlaceholder = wrapper.find('[data-test="pdf-preview-placeholder"]');
		expect(pdfPreviewPlaceholder.exists()).toBe(true);
		expect(pdfPreviewPlaceholder.text()).toBe('Preview will be shown here');
	});
});
