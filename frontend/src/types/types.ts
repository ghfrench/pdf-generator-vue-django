import type { PDFPage } from 'pdf-lib';

export type TextElement = {
	type: 'text',
	text: string,
	x: number,
	y: number,
	size: number,
	colorRed: number,
	colorGreen: number,
	colorBlue: number,
	maxWidth: number,
	lineHeight: number,
};

export type RectangleElement = {
	type: 'rectangle',
	x: number,
	y: number,
	width: number,
	height: number,
	colorRed: number,
	colorGreen: number,
	colorBlue: number,
	borderColorRed: number,
	borderColorGreen: number,
	borderColorBlue: number,
	borderWidth: number;
};

export type PdfElement = TextElement | RectangleElement;

export type CustomTemplate = {
	name: string,
	id: number,
	elements: PdfElement[];
};

export type UserTemplateInputs = {
	name: string;
	company: string;
	title: string;
};

export type StaticTemplate = {
	name: string,
	id: number,
	applyTemplate: (page: PDFPage, props: UserTemplateInputs) => Promise<void>;
};
