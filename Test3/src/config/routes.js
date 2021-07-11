// Layout
import Layout from "../layouts/Layout";

import Home from "../pages/Home/Home";

const routes = [
	{
		path: "/",
		component: Layout,
		exact: false,
		routes: [
			{
				path: "/",
				component: Home,
				exact: true,
			},
			{
				component: Home,
			},
		],
	},
];

export default routes;
