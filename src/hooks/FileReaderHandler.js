import { handleDocxFile } from "./fileHandlers/DocFileHandler";
import { handleTxtFile } from "./fileHandlers/TextFileHandler";

const handleFileUpload = (e) => {
	const file = e.target.files[0];
	if (!file) return;

	const fileExtension = file.name.split('.').pop().toLowerCase();

	if (fileExtension === 'txt') {
		handleTxtFile(file);
	} else if (fileExtension === 'docx') {
		handleDocxFile(file);
	} else {
		alert("Unsupported file type");
	}
};

export {handleFileUpload}
