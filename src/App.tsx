import React from "react"
import { BrowserRouter, Route } from "react-router-dom"
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import { Redirect } from "react-router-dom"

// Pages
import Home from "./pages/Home"
import LiquidationPriceCalculator from "./pages/LiquidationPriceCalculator"
import MarketXyzLiquidationPriceCalculator from "./pages/MarketXyz/Polygon/MarketXyzLiquidationPriceCalculator"

// Assets
import "./assets/sass/styles.scss"

export interface IRoute {
	path: string
	exact?: boolean
	children: JSX.Element
}

// Register FontAwesomeIcons
library.add(fas)

export default function App(): JSX.Element {
	const routes: IRoute[] = [
		{
			path: "/",
			exact: true,
			children: <Home />
		},
		{
			path: "/tools/fuse/:poolId",
			exact: true,
			children: <LiquidationPriceCalculator />
		},
		{
			path: "/tools/opp-liquidation-price",
			exact: true,
			children: <Redirect to={"/tools/fuse/18"} />
		},
		{
			path: "/tools/tetranode-liquidation-price",
			exact: true,
			children: <Redirect to={"/tools/fuse/6"} />
		},
		{
			path: "/market-xyz/polygon/pool/:poolId",
			exact: true,
			children: <MarketXyzLiquidationPriceCalculator />
		},
	]

	return (
		<BrowserRouter>
			{routes.map((route: IRoute, key: number) => <Route key={key} path={route.path} exact={route.exact || false}>{route.children}</Route>)}
		</BrowserRouter>
	)
}
