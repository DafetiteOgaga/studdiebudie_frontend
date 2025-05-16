

const serverOrigin = 'http://localhost:4000';

async function FetchFromServer(endpoint, method = 'GET', body = null) {
	try {
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

export { FetchFromServer };
