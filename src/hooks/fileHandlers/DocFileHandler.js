import mammoth from "mammoth";

const handleDocxFile = (file, callbackFxn) => {
	const reader = new FileReader();
	reader.onload = async (e) => {
		const arrayBuffer = e.target.result;
		const { value } = await mammoth.extractRawText({ arrayBuffer });
		// const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
		// console.log(value);
		// console.log(JSON.stringify(html, null, 2)); // plain text content of the .docx

		callbackFxn(value)
	};

	reader.readAsArrayBuffer(file);
};

export {handleDocxFile}

// return <input type="file" accept=".docx" onChange={handleDocxFile} />;
