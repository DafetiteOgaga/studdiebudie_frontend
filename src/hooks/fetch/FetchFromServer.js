

const serverOrigin = process.env.REACT_APP_API_BASE_URL;

// console.log('serverOrigin:', serverOrigin);
async function FetchFromServer(endpoint, method = 'GET', body = null) {
	// console.log('FetchFromServer called')
	try {
			// console.log(
			// 	'\nendpoint:', endpoint,
			// 	'\nmethod:', method,
			// 	'\nbody:', body ? JSON.stringify(body, null, 2) : 'No body provided'
			// )
			const response = await fetch(`${serverOrigin}${endpoint}/`, {
			method: method.toUpperCase(),
			headers: {
				'Content-Type': 'application/json',
			},
			body: body ? JSON.stringify(body) : null,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log('Success:', data);
		return data;

	} catch (error) {
		console.error('Error:', error);
		throw error;
	}
}

export { FetchFromServer, serverOrigin };
