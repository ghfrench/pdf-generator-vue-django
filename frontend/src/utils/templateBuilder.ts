import {
	PDFPage,
	rgb,
	StandardFonts
} from "pdf-lib";
import type { PdfElement, UserTemplateInputs } from '../types/types';

export async function templateBuilder(page: PDFPage, elements: PdfElement[], userInputs?: UserTemplateInputs) {
	const font = await page.doc.embedFont(StandardFonts.Helvetica);

	elements.forEach(element => {
		if (element.type === "text") {
			let text = element.text;
			if (userInputs) {
				text = text.replace(/{(\w+)}/g, (_, key) => userInputs[key as keyof UserTemplateInputs] || '');
			}
			page.drawText(text, {
				x: element.x,
				y: element.y,
				size: element.size,
				font,
				color: rgb(element.colorRed / 255, element.colorGreen / 255, element.colorBlue / 255),
				maxWidth: element.maxWidth,
				lineHeight: element.lineHeight
			});
		}
		if (element.type === "rectangle") {
			page.drawRectangle({
				x: element.x,
				y: element.y,
				width: element.width,
				height: element.height,
				color: rgb(element.colorRed / 255, element.colorGreen / 255, element.colorBlue / 255),
				borderColor: rgb(element.borderColorRed / 255, element.borderColorGreen / 255, element.borderColorBlue / 255),
				borderWidth: element.borderWidth,
			});
		}
	});
}
