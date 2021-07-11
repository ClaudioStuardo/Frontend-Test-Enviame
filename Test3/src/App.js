import React from "react";
import { ConfigProvider, BackTop } from "antd";
import es_ES from "antd/es/locale/es_ES";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import routes from "./config/routes";

import "./App.scss";

const App = () => {
	return (
		<ConfigProvider locale={es_ES}>
			<Router>
				<Switch>
					{routes.map((route, index) => (
						<RouteWithSubRoutes key={index} {...route} />
					))}
				</Switch>
			</Router>
			<BackTop />
		</ConfigProvider>
	);
};

export default App;

function RouteWithSubRoutes(route) {
	return <Route path={route.path} exact={route.exact} render={(props) => <route.component routes={route.routes} {...props} />} />;
}
