// JSON
let values = {
	1: {
		carrier: "CCH",
		service: "DEX",
	},
	17: {
		carrier: "CHP",
		service: "express",
	},
};
// JSON
let json = {
	data: {
		BUIN: {
			limit: 1,
			over_carrier_service_id: 17,
			under_carrier_service_id: 17,
		},
		LAJA: {
			limit: 1,
			over_carrier_service_id: 1,
			under_carrier_service_id: 1,
		},
		LEBU: {
			limit: 1,
			over_carrier_service_id: 1,
			under_carrier_service_id: 1,
		},
		LOTA: {
			limit: 1,
			over_carrier_service_id: 17,
			under_carrier_service_id: 17,
		},
	},
};

exports.getJson = () => {
    // inicializar el objeto
    let data = {};

    // recorrer el objeto json
	for(var jsonObj in json.data){

        // se guarda en una variable los atributos dentro del objeto data con la key "jsonObj"
        var valueData = json.data[jsonObj];
        
        // Se pregunta por el valor de "over_carrier_service_id"
        if (valueData.over_carrier_service_id === 17) {

            // recorrer el objeto values
            for(var valuesObj in values){

                // se guarda en una variable los atributos dentro del objeto values con la key "valuesObj"
                var valueJsonData = values[valuesObj];

                // se guardan los valores cuando la key valuesObj es igual a 17
                if (parseInt([valuesObj]) === 17) {
                    data = {
                        ...data,
                        [jsonObj]: {
                            limit: valueData.limit,
                            over: {
                                carrier: valueJsonData.carrier,
                                service: valueJsonData.service,
                            },
                            under: {
                                carrier: valueJsonData.carrier,
                                service: valueJsonData.service,
                            }
                        },
                    }
                }
            }
        } else {
            // recorrer el objeto values
            for(var valuesObj in values){

                // se guarda en una variable los atributos dentro del objeto values con la key "valuesObj"
                var valueJsonData = values[valuesObj];

                // se guardan los valores cuando la key valuesObj es igual a 1
                if (parseInt([valuesObj]) === 1) {
                    data = {
                        ...data,
                        [jsonObj]: {
                            limit: valueData.limit,
                            over: {
                                carrier: valueJsonData.carrier,
                                service: valueJsonData.service,
                            },
                            under: {
                                carrier: valueJsonData.carrier,
                                service: valueJsonData.service,
                            }
                        },
                    }
                }
            }
        }
    }
	return data;
};
