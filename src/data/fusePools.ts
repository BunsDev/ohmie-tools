interface FusePools {
	[poolId: string]: {
		name: string
		id: number
		collateralFactor: number
		verified: boolean
	}
}

const FUSE_POOLS: FusePools = {
	"6": {
		name: "Tetranode's Locker",
		id: 6,
		collateralFactor: .66,
		verified: true
	},
	"18": {
		name: "Olympus Pool Party",
		id: 18,
		collateralFactor: .4,
		verified: true
	},
	"36": {
		name: "Fraximalist Money Market",
		id: 36,
		collateralFactor: .69,
		verified: true
	},
}

export default FUSE_POOLS
