/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from "react";
import { Spin, notification } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

// components
import Hero from "./controllers/Hero/Hero";
import Search from "./controllers/Search/Search";

// api
import { getCharactersApi } from "../../api/marvel";

// assets
import banner from "../../assets/images/banner.jpeg";

// style
import "./Home.scss";

let offset = 0;
let totalHeroes = 0;

const Home = () => {
	const [loading, setLoading] = useState(false);
	const [loading2, setLoading2] = useState(false);
	const [searchState, setSearchState] = useState(false);
	const [data, setData] = useState([]);
	const [dataSearched, setDataSearched] = useState([]);

	useEffect(() => {
		setLoading(true);
		getChatacters();
	}, []);

	const getChatacters = async () => {
		const response = await getCharactersApi(offset);
		if (response.status === "Ok") {
			totalHeroes = response.data.total;
			setData(response.data.results);
			setLoading(false);
		} else {
			notification["error"]({
				message: response.message,
			});
			setLoading(false);
		}
	};

	const handleOnDocumentBottom = useCallback(() => {
		setLoading2(true);
		getNewChatacters();
	}, []);

	const getNewChatacters = async () => {
		if (offset + 20 > totalHeroes) {
			const aux = totalHeroes - offset;
			offset = aux;
			const response = await getCharactersApi(offset);
			if (response.status === "Ok") {
				response.data.results.forEach((element) => {
					setData((data) => [...data, element]);
				});
				setLoading2(false);
			} else {
				notification["error"]({
					message: response.message,
				});
				setLoading2(false);
			}
		} else {
			offset = offset + 20;
			const response = await getCharactersApi(offset);
			if (response.status === "Ok") {
				response.data.results.forEach((element) => {
					setData((data) => [...data, element]);
				});
				setLoading2(false);
			} else {
				notification["error"]({
					message: response.message,
				});
				setLoading2(false);
			}
		}
	};

	useBottomScrollListener(handleOnDocumentBottom);

	const antIcon = <LoadingOutlined spin />;

	return (
		<Spin spinning={loading} size="large" tip="Cargando..." indicator={antIcon}>
			<div className="home-container">
				<div className="banner">
					<img src={banner} alt="banner" />
				</div>
				<h1 className="title">Frontend Test Envíame</h1>
				<p className="description-page">Claudio Stuardo {"<claudio.stuardo96@gmail.com>"}</p>
				<Search data={dataSearched} setData={setDataSearched} setSearch={setSearchState} offset={offset} />
				<div className="heroes-container">
					{searchState ? (
						<>
							{dataSearched.map((item, i) => {
								return (
									<div className="col-4" key={i}>
										<Hero data={item} fullData={data} setData={setData} index={i} />
									</div>
								);
							})}
						</>
					) : (
						<>
							{data.map((item, i) => {
								return (
									<div className="col-4" key={i}>
										<Hero data={item} fullData={data} setData={setData} index={i} />
									</div>
								);
							})}
						</>
					)}
				</div>
				<Spin spinning={loading2} size="large" tip="Cargando..." indicator={antIcon}>
					<div className="loading-container" />
				</Spin>
			</div>
		</Spin>
	);
};

export default Home;
