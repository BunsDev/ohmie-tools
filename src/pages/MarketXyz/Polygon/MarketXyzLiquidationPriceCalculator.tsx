import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Dropdown, Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Default from "../../../layouts/Default"
import MARKET_XYZ_POOLS, { CollateralAsset } from "../../../data/marketXyzPools"

export default function MarketXyzLiquidationPriceCalculator(): JSX.Element {
	const { poolId } = useParams<{ poolId: string | undefined }>()

	if (!poolId || !Object.prototype.hasOwnProperty.call(MARKET_XYZ_POOLS, poolId)) {
		return (
			<p className={"lead text-center"}>404</p>
		)
	}

	const pool = MARKET_XYZ_POOLS[poolId]

	// States
	const [collateralFactor, setCollateralFactor] = useState<number>(0)
	const [collateralAsset, setCollateralAsset] = useState<CollateralAsset | null>(pool.collateralAssets[0] || null)
	const [collateralAssetPrice, setCollateralAssetPrice] = useState<number>(0)
	const [lendingAmount, setLendingAmount] = useState<number>(0)
	const [borrowAmount, setBorrowAmount] = useState<number>(0)
	const [liquidationPrice, setLiquidationPrice] = useState<number>(0)

	// States: UI
	const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

	// Effects
	useEffect(() => {
		if (collateralAsset) {
			(async () => {
				setCollateralAssetPrice(
					((await (
						await fetch(collateralAsset.apiUrl)
					).json())).market_data.current_price.usd
				)
			})()
		}
	}, [collateralAsset])

	useEffect(() => {
		setCollateralFactor(collateralAsset ? collateralAsset.collateralFactor : 0)
	}, [collateralAsset])

	useEffect(() => {
		if (collateralAssetPrice === 0 || borrowAmount === 0 || lendingAmount === 0) {
			setLiquidationPrice(0)
		} else {
			setLiquidationPrice(
				lendingAmount * collateralAssetPrice * (1/collateralFactor) / ((lendingAmount*collateralAssetPrice)/borrowAmount) / lendingAmount
			)
		}
	}, [lendingAmount, borrowAmount, collateralAssetPrice, collateralFactor])

	// Update collateral factor each time a pool is changed
	useEffect(() => {
		if (collateralAsset) {
			setCollateralFactor(collateralAsset.collateralFactor)
		}
	}, [pool, collateralAsset])

	// Methods
	const numberFormatter = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	})

	if (null === collateralAsset) {
		return (
			<>
				<p className="lead text-center">Invalid collateral asset chosen.</p>
			</>
		)
	}

	// Render
	return (
		<Default>
			<>
				<Modal
					show={showSettingsModal}
					onHide={() => setShowSettingsModal(false)}
				>
					<Modal.Header
						closeButton
						className={"bg-dark border-bottom-0 py-2 px-3 pb-1"}
					>
						<Modal.Title>Settings</Modal.Title>
					</Modal.Header>
					<Modal.Body
						className={"bg-dark pt-0"}
					>
						<div className="form-group">
							<label htmlFor="collateralFactor">
								Collateral Factor (in %)
							</label>
							<div className="controls">
								<input
									type="number"
									id={"collateralFactor"}
									value={collateralFactor}
									onChange={event => {
										setCollateralFactor(Number(event.target.value))
									}}
									className="form-control"
								/>
								<p className={"text-muted small mt-1 mb-0"}>
									Original:{" "}
									<a
										onClick={event => {
											event.preventDefault()
											setCollateralFactor(collateralAsset.collateralFactor)
										}}
									>{collateralAsset.collateralFactor}</a>
								</p>
							</div>
						</div>
					</Modal.Body>
					<Modal.Footer
						className={"bg-dark text-end py-1 border-top-0"}
					>
						<button
							type={"button"}
							onClick={() => setShowSettingsModal(false)}
							className="btn btn-success btn-sm"
						>
							Save Changes
						</button>
					</Modal.Footer>
				</Modal>
				<div className="row justify-content-center">
					<div className="col-md-10 col-lg-8 col-xl-6">
						<div className="card">
							<div className="card-header text-center position-relative">
								<small className={"text-muted"}><small>Market.xyz</small></small>
								<br/>
								<small className={"text-muted"}>Liquidation Price Calculator</small>
								<br/>
								Pool (#{pool.id}): {pool.name}
								<button
									onClick={() => setShowSettingsModal(true)}
									className="btn btn-transparent btn-sm text-white"
									style={{
										position: "absolute",
										top: "50%",
										right: ".5rem",
										transform: "translateY(-50%)"
									}}
								><FontAwesomeIcon icon={"cog"} /></button>
							</div>
							<div className="card-body">
								<p className="text-center text-muted mb-4">
									<small>
										For the <a href={"https://polygon.market.xyz/pool/"+pool.id} target={"_blank"} rel="noreferrer" className={"text-muted"}>{pool.name}</a> pool (#{pool.id})
									</small>
								</p>
								<form action="#" method={"GET"}>
									<div className="form-group mb-3">
										<label htmlFor="collateralAsset">
											Collateral Asset
										</label>
										<div className="controls">
											<Dropdown>
												<Dropdown.Toggle variant={"dark"}>{collateralAsset.symbol} ({collateralAsset.collateralFactor*100}% LTV)</Dropdown.Toggle>
												<Dropdown.Menu>
													{pool.collateralAssets.map((collateralAsset: CollateralAsset, index: number) => (
														<Dropdown.Item
															key={index}
															onClick={(event) => {
																event.preventDefault()
																event.currentTarget.blur()

																setCollateralAsset(collateralAsset)
															}}
														>{collateralAsset.symbol} ({collateralAsset.collateralFactor*100}% LTV)</Dropdown.Item>
													))}
												</Dropdown.Menu>
											</Dropdown>
										</div>
									</div>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label htmlFor="lendingAmount">
													How much {collateralAsset.symbol} are you lending?
												</label>
												<div className="controls">
													<input
														type="number"
														defaultValue={lendingAmount}
														onChange={event => setLendingAmount(Number(event.currentTarget.value))}
														className="form-control"
													/>
													<p className="small text-muted mt-1">
														<small>
															Value (USD): {numberFormatter.format(((lendingAmount > 0 && collateralAssetPrice > 0) ? (collateralAssetPrice*lendingAmount) : 0))}
														</small>
													</p>
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label htmlFor="lendingAmount">
													How much are you borrowing (USD)?
												</label>
												<div className="controls">
													<input
														type="number"
														defaultValue={borrowAmount}
														onChange={event => setBorrowAmount(Number(event.currentTarget.value))}
														className="form-control"
													/>
													<p className="small text-muted mt-1">
														<small>
															Borrow Limit (USD): {numberFormatter.format(((lendingAmount > 0 && collateralAssetPrice > 0) ? (collateralAssetPrice*lendingAmount)*collateralFactor : 0))}
														</small>
													</p>
												</div>
											</div>
										</div>
									</div>
									<div className="row text-center">
										<div className="col-md-6">
											<div className="text-center mt-4">
												<p className="small text-muted mb-2">
													{collateralAsset.symbol} Price:
												</p>
												<p className="lead">${collateralAssetPrice} <small className={"text-muted"}>USD</small></p>
											</div>
										</div>
										<div className="col-md-6">
											<div className="text-center mt-4">
												<p className="small text-muted mb-2">
													Your Liquidation Price:
												</p>
												<p className="lead"><span title={liquidationPrice+" USD"}><span className={(liquidationPrice >= collateralAssetPrice && collateralAssetPrice > 0) ? "text-danger" : ""}>${liquidationPrice.toFixed(2)}</span> <small className={"text-muted"}>USD</small></span></p>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</>
		</Default>
	)
}
