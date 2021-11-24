export interface CollateralAsset {
	name: string
	symbol: string
	collateralFactor: number
	apiUrl: string
}

export interface MarketXyzPools {
	[poolId: string]: {
		name: string
		id: number
		collateralAssets: CollateralAsset[]
		verified: boolean
	}
}

const MARKET_XYZ_POOLS: MarketXyzPools = {
	"5": {
		name: "Green Leverage Locker",
		id: 5,
		collateralAssets: [
			{
				name: "Staked KLIMA",
				symbol: "sKLIMA",
				collateralFactor: .45,
				apiUrl: "https://api.coingecko.com/api/v3/coins/klima-dao"
			},
			{
				name: "Wrapped Ether",
				symbol: "WETH",
				collateralFactor: .65,
				apiUrl: "https://api.coingecko.com/api/v3/coins/ethereum"
			}
		],
		verified: true
	},
}

export default MARKET_XYZ_POOLS
