import mammoth from "mammoth";

const handleDocxFile = (file) => {
	const reader = new FileReader();
	reader.onload = async (e) => {
		const arrayBuffer = e.target.result;
		const { value } = await mammoth.extractRawText({ arrayBuffer });
		console.log({value}); // plain text content of the .docx
	};

	reader.readAsArrayBuffer(file);
};

export {handleDocxFile}

// return <input type="file" accept=".docx" onChange={handleDocxFile} />;
