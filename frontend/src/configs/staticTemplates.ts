import {
	PDFPage,
	rgb,
	StandardFonts
} from "pdf-lib";
import type { StaticTemplate, UserTemplateInputs } from '../types/types';

const staticTemplates: StaticTemplate[] = [
	{
		name: 'Example Template',
		id: -1,
		applyTemplate: async (page: PDFPage, { name, company, title }: UserTemplateInputs) => {
			const { width, height } = page.getSize();

			const font = await page.doc.embedFont(StandardFonts.Helvetica);
			const boldFont = await page.doc.embedFont(StandardFonts.HelveticaBold);

			const margin = 72; // 1 inch margin
			const tableColumn1Width = 180;
			const tableColumn2Width = 288;
			const tableHeaderRowHeight = 27;
			const tableBodyRowHeight = 18;

			page.moveTo(margin, height - margin - 24);

			page.drawText(company, {
				x: margin + 5,
				size: 24,
				font: boldFont,
				color: rgb(0, 0, .54),
			});

			page.moveDown(50 + 14);

			page.drawText(title, {
				x: margin + 5,
				size: 14,
				font: boldFont,
				color: rgb(0, 0, 0),
			});

			page.moveDown(18 + 10);

			page.drawText(`Prepared for: ${name}`, {
				x: margin + 5,
				size: 10,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(18 + 10);

			page.drawText("This document has been automatically generated based on your information. You can customize this template further according to your specific needs.", {
				x: margin + 5,
				size: 10,
				font,
				color: rgb(0, 0, 0),
				maxWidth: width - margin * 2,
				lineHeight: 10,
				wordBreaks: [" "]
			});

			page.moveDown(20 + tableHeaderRowHeight);

			// Table

			page.drawRectangle({
				x: margin,
				width: tableColumn1Width,
				height: tableHeaderRowHeight,
				color: rgb(.5, .5, .5),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawRectangle({
				x: margin + tableColumn1Width,
				width: tableColumn2Width,
				height: tableHeaderRowHeight,
				color: rgb(.50, .50, .50),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText("Document Information", {
				x: margin + 5,
				y: page.getY() + 8,
				size: 14,
				font: boldFont,
				color: rgb(1, 1, 1),
			});

			page.moveDown(tableBodyRowHeight);

			page.drawRectangle({
				x: margin,
				width: tableColumn1Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawRectangle({
				x: margin + tableColumn1Width,
				width: tableColumn2Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText("Full Name", {
				x: margin + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});
			page.drawText(name, {
				x: margin + tableColumn1Width + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(tableBodyRowHeight);

			page.drawRectangle({
				x: margin,
				width: tableColumn1Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawRectangle({
				x: margin + tableColumn1Width,
				width: tableColumn2Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText("Company", {
				x: margin + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});
			page.drawText(company, {
				x: margin + tableColumn1Width + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(tableBodyRowHeight);

			page.drawRectangle({
				x: margin,
				width: tableColumn1Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawRectangle({
				x: margin + tableColumn1Width,
				width: tableColumn2Width,
				height: tableBodyRowHeight,
				color: rgb(.96, .96, .86),
				borderColor: rgb(0, 0, 0),
				borderWidth: 1,
			});
			page.drawText(`Document Title`, {
				x: margin + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});
			page.drawText(title, {
				x: margin + tableColumn1Width + 5,
				y: page.getY() + 5,
				size: 12,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(18 + 10);

			page.drawText(`Generated for: ${company}`, {
				x: (width - font.widthOfTextAtSize(`Generated for: ${company}`, 10)) / 2,
				size: 10,
				font,
				color: rgb(.5, .5, .5),
			});

			page.moveDown(11);

			page.drawText("This is an automatically generated document", {
				x: (width - font.widthOfTextAtSize("This is an automatically generated document", 10)) / 2,
				size: 10,
				font,
				color: rgb(.5, .5, .5),
			});
		}
	},
	{
		name: 'Thank You Template',
		id: -2,
		applyTemplate: async (page: PDFPage, { name, company, title }: UserTemplateInputs) => {
			const { width, height } = page.getSize();

			const font = await page.doc.embedFont(StandardFonts.Helvetica);
			const boldFont = await page.doc.embedFont(StandardFonts.HelveticaBold);

			const margin = 72; // 1 inch margin

			page.moveTo(margin, height - margin - 24);

			page.drawText(`To whom it may concern,`, {
				size: 14,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(50);

			page.drawText(`Thank you for giving me the opportunity to interview with you for a position at ${company}.`, {
				size: 14,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(50);

			page.drawText(`Best,`, {
				size: 14,
				font,
				color: rgb(0, 0, 0),
			});

			page.moveDown(14);

			page.drawText(name, {
				size: 14,
				font,
				color: rgb(0, 0, 0),
			});
		}
	}
];

export default staticTemplates;
