/* eslint-disable */
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { uniLogo } from './uniLogo';

export const downloadPdf = (
	tableId: string,
	headerText: string,
	assistantName?: string,
	courseName?: string,
	withImage?: boolean
) => {
	const doc: any = new jsPDF();
	const pageWidth =
		doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
	const heads = headerText + '-' + courseName + '-' + assistantName;

	autoTable(doc, {
		html: tableId,
		margin: { horizontal: 10, vertical: 40 },
		styles: {
			overflow: 'visible',
			halign: 'center',
			valign: 'middle',
		},
		bodyStyles: {
			valign: 'top',
			halign: 'center',
			cellPadding: 0.5,
			overflow: 'visible',
			cellWidth: 'wrap',
		},
		theme: 'striped',
		showHead: 'everyPage',
		didDrawCell: withImage
			? function (data: any) {
					const columnIndices = [2, 3, 4, 5];
					if (
						columnIndices.includes(data.column.index) &&
						data.cell.section === 'body'
					) {
						const rowIndex = data.row.index;
						const img = document.getElementsByTagName('img')[rowIndex];
						const dim = data.cell.height - data.cell.padding('vertical');
						const textPos = data.cell;
						const centerX = textPos.x + data.cell.width / 2;
						doc.addImage(img.src, centerX - 3, textPos.y, 4, 4);
					}
			  }
			: undefined,
		didDrawPage: function (data: any) {
			// Header
			doc.setFontSize(10);
			doc.setLineHeightFactor(20);
			doc.setTextColor(57, 40, 127);
			doc.text(
				'Faculty of Computer and Artificial Intelligence Benha University ',
				pageWidth / 3.3,
				25,
				'center'
			);
			doc.text(heads, pageWidth / 3.65, 30, 'center');
			doc.text(
				'Date: ' + new Date().toLocaleDateString(),
				pageWidth / 7.92,
				35,
				'center'
			);
			doc.addImage(uniLogo, 'JPEG', pageWidth / 1.2, 15, 18.5, 18.5);

			// Footer
			const str: any = 'Page ' + doc.internal.getNumberOfPages();

			doc.setFontSize(10);

			// jsPDF 1.4+ uses getWidth, <1.4 uses .width
			const pageSize = doc.internal.pageSize;
			const pageHeight = pageSize.height
				? pageSize.height
				: pageSize.getHeight();
			doc.text(str, data.settings.margin.left, pageHeight - 10);
		},
	});
	doc.save(headerText).pdf;
};
