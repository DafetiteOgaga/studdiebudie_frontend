const handleTxtFile = (file) => {
	const reader = new FileReader();
	reader.onload = (e) => {
		const text = e.target.result;
		console.log({text});
	};
	reader.readAsText(file);
};

export {handleTxtFile}

// return <input type="file" accept=".txt" onChange={handleTxtFile} />;
