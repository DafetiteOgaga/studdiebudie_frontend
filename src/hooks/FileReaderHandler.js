import { useState } from 'react';
import { handleDocxFile } from "./fileHandlers/DocFileHandler";
import { handleTxtFile } from "./fileHandlers/TextFileHandler";

const useHandleFileUpload = () => {
	const [text, setText] = useState(null);
	// const [reference, setReference] = useState(0);

	// console.log('\nisFile#1:', !!text)
	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		// console.log('\nisFile#2:', file)
		if (!file) {
			setText(null)
			return
		}

		const fileExtension = file.name.split('.').pop().toLowerCase();
		// let result;

		if (fileExtension === 'txt') {
			handleTxtFile(file, (txtText) => {
				setText(txtText);
			})
		} else if (fileExtension === 'docx') {
			handleDocxFile(file, (docText) => {
				setText(docText);
			});
		} else {
			alert("Unsupported file type");
			return null
		}
		// setReference(1)
		// console.log({result})
	}
	let processedText;
	if (text) {
		processedText = text?.split(/(?:Q|q)\d+[.:]/)
		processedText = processedText
						.map(q => q.trim())       // clean up extra spaces
						.filter(Boolean)          // remove any empty strings
						.map((q, index) => ({
							id: index,
							question: q,
						}));
	}
	// console.log('\ntext:', !!text)
	return { text, processedText, handleFileChange};
};

export {useHandleFileUpload}
