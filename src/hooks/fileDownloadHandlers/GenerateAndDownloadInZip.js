import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const generateFilesAndDownload = async (fileContent, fileType, fileName='testzipper') => {
	const zip = new JSZip();

	// console.log({fileType})
	if (fileType==='txt') {
		// TXT file
		zip.file(`${fileName}.txt`, fileContent);
	} else {
		// DOCX file
		const doc = new Document({
			sections: [
			{
			children: [
				new Paragraph({
				children: [new TextRun(fileContent.school)],
				}),
				new Paragraph({
				children: [new TextRun(fileContent.subject)],
				}),
				new Paragraph({
				children: [new TextRun(fileContent.question1)],
				}),
				new Paragraph({
				children: [new TextRun(fileContent.question2)],
				}),
			],
			},
		],
	});

	const docBuffer = await Packer.toBlob(doc);
	zip.file(`${fileName}.docx`, docBuffer);
	}

	// Generate zip and trigger download
	zip.generateAsync({ type: "blob" }).then((content) => {
		saveAs(content, "exam_papers.zip");
	});
};

export {generateFilesAndDownload}