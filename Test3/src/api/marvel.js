export function getCharactersApi(offset) {
	const url = `http://gateway.marvel.com/v1/public/characters?offset=${offset}&ts=1&apikey=000776d9a6dfca289d5861dbaadb04ee&hash=1279cdb49701ca207db95e44c7f0da1c`;

	const params = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	return fetch(url, params)
		.then((resp) => {
			return resp.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}

export function getSearchCharactersApi(offset, name) {
	const url = `http://gateway.marvel.com/v1/public/characters?offset=${offset}&name=${name}&ts=1&apikey=000776d9a6dfca289d5861dbaadb04ee&hash=1279cdb49701ca207db95e44c7f0da1c`;

	const params = {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	};

	return fetch(url, params)
		.then((resp) => {
			return resp.json();
		})
		.then((result) => {
			return result;
		})
		.catch((err) => {
			return err.message;
		});
}
