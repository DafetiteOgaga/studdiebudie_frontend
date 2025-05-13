const handleTxtFile = (file, callbackFxn) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		const text = e.target.result;
		console.log({text});
		callbackFxn(text);
	};
	reader.readAsText(file);
};

export {handleTxtFile}

// return <input type="file" accept=".txt" onChange={handleTxtFile} />;
