import React, { useState } from "react";
import { Input, notification } from "antd";

// api
import { getSearchCharactersApi } from "../../../../api/marvel";

// style
import "./Search.scss";

const { Search } = Input;

const SearchFunction = (props) => {
	let { setData, setSearch } = props;
	const [loading, setLoading] = useState(false);
	const [searchInput, setSearchInput] = useState("");

	const handleChange = (e) => {
		if (e.target.value.length === 0) {
			setSearch(false);
		}
		setSearchInput(e.target.value);
	};

	const onSearch = async () => {
		setLoading(true);
		if (searchInput.length > 0) {
			const response = await getSearchCharactersApi(0, searchInput);
			if (response.status === "Ok") {
				setData(response.data.results);
				setLoading(false);
				setSearch(true);
			} else {
				notification["error"]({
					message: response.message,
				});
				setLoading(false);
			}
		} else {
			setLoading(false);
			setSearch(false);
		}
	};

	return (
		<div className="search-container">
			<Search
				value={searchInput}
				onChange={handleChange}
				onSearch={onSearch}
				size="large"
				placeholder="Busca a un personaje (Ej: Captain America)"
				loading={loading}
				enterButton
			/>
		</div>
	);
};

export default SearchFunction;
