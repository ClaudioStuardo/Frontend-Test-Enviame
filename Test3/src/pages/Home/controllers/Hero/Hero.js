/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Drawer, Spin, Form, Button, DatePicker, notification } from "antd";
import { EditOutlined, LoadingOutlined } from "@ant-design/icons";
import moment from "moment";

// components
import { minLengthValidation } from "../../../../utils/formValidation";

// style
import "./Hero.scss";

const Hero = (props) => {
	const { data, fullData, setData, index } = props;
	const [visible, setVisible] = useState(false);
	const [loading, setLoading] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		description: "",
		modified: "",
		modifiedAux: "",
	});

	const [formValid, setFormValid] = useState({
		name: true,
		description: true,
		modified: true,
	});

	useEffect(() => {
		if (visible) {
			setInputs({
				name: data.name,
				description: data.description,
				modified: data.modified,
				modifiedAux: data.modified,
			});
		}
	}, [visible]);

	const onChange = (date, dateString) => {
		setInputs({
			...inputs,
			modified: moment(date).format("DD-MM-YYYY"),
			modifiedAux: moment(date).format(),
		});
		if (!moment(date).isValid()) {
			setFormValid({
				modified: false,
			});
		}
	};

	const changeForm = (e) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

	const inputValidation = async (e) => {
		const { name } = e.target;
		setFormValid({
			...formValid,
			[name]: minLengthValidation(e.target, 2),
		});
	};

	const saveHero = () => {
		setLoading(true);
		const valName = inputs.name;
		const valDescription = inputs.description;
		const valModified = inputs.modified;
		const nameValid = formValid.name;
		const descriptionValid = formValid.description;
		const modifiedValid = formValid.modified;

		if (!valName || !valModified) {
			notification["error"]({
				message: "Todos los campos son obligatorios",
			});
			setLoading(false);
		} else if (!nameValid) {
			notification["error"]({
				message: "Ingrese un nombre válido",
			});
			setLoading(false);
		} else if (!descriptionValid) {
			notification["error"]({
				message: "Ingrese una descripción válida",
			});
			setLoading(false);
		} else if (!modifiedValid) {
			notification["error"]({
				message: "Ingrese una fecha válida",
			});
			setLoading(false);
		} else {
			let dataAux = fullData;
			dataAux[index].name = valName;
			dataAux[index].description = valDescription;
			dataAux[index].modified = inputs.modifiedAux;
			setData(dataAux);
			setLoading(false);
			setVisible(false);
		}
	};

	const antIcon = <LoadingOutlined spin />;

	return (
		<>
			<Card className="card-hero" hoverable cover={<img alt="example" src={`${data.thumbnail.path}.${data.thumbnail.extension}`} />}>
				<h1 className="name">{data.name}</h1>
				<p className="description">{data.description}</p>
				<p className="modified">{moment(data.modified).format("DD-MM-YYYY")}</p>
			</Card>
			<EditOutlined className="edit-card" onClick={() => setVisible(true)} />
			<Drawer
				title={`Editar a ${data.name}`}
				placement="right"
				closable={true}
				width={"50%"}
				onClose={() => setVisible(false)}
				visible={visible}
				footer={
					<div
						style={{
							textAlign: "right",
						}}
					>
						<Button onClick={() => setVisible(false)} style={{ marginRight: 8 }}>
							Cancelar
						</Button>
						<Button onClick={() => saveHero()} type="primary">
							Guardar
						</Button>
					</div>
				}
			>
				<Spin spinning={loading} size="large" tip="Cargando..." indicator={antIcon}>
					<Form className="form-container" onChange={changeForm}>
						<div className="field">
							<input id="name" type="text" name="name" placeholder="Nombre" value={inputs.name} onChange={inputValidation} />
							<label>Nombre</label>
						</div>
						<div className="field">
							<input
								id="description"
								type="text"
								name="description"
								placeholder="Descripción"
								value={inputs.description}
								onChange={inputValidation}
							/>
							<label>Descripción</label>
						</div>
						<div className="field">
							<DatePicker allowClear={false} onChange={onChange} value={moment(inputs.modifiedAux)} format={"DD-MM-YYYY"} />
							<label>Fecha</label>
						</div>
					</Form>
				</Spin>
			</Drawer>
		</>
	);
};

export default Hero;
