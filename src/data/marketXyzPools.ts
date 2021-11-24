interface CollateralAsset {
	name: string
	symbol: string
	collateralFactor: number
}

interface MarketXyzPools {
	[poolId: string]: {
		name: string
		id: number
		collateralAsset: CollateralAsset
		verified: boolean
	}
}

const MARKET_XYZ_POOLS: MarketXyzPools = {
	"5": {
		name: "Green Leverage Locker",
		id: 5,
		collateralAsset: {
			name: "Staked KLIMA",
			symbol: "sKLIMA",
			collateralFactor: .45
		},
		verified: true
	},
}

export default MARKET_XYZ_POOLS
