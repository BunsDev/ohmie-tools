import React, { useEffect, useState } from "react"
import Default from "../layouts/Default"
import { useParams } from "react-router-dom"
import FUSE_POOLS from "../data/fusePools"
import { Modal } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LiquidationPriceCalculator(): JSX.Element {
	const { poolId } = useParams<{ poolId: string | undefined }>()

	if (!poolId || !Object.prototype.hasOwnProperty.call(FUSE_POOLS, poolId)) {
		return (
			<p className={"lead text-center"}>404</p>
		)
	}

	const pool = FUSE_POOLS[poolId]

	// States
	const [collateralFactor, setCollateralFactor] = useState<number>(pool.collateralFactor)
	const [ohmPrice, setOhmPrice] = useState<number>(0)
	const [lendingAmount, setLendingAmount] = useState<number>(0)
	const [borrowAmount, setBorrowAmount] = useState<number>(0)
	const [liquidationPrice, setLiquidationPrice] = useState<number>(0)

	// States: UI
	const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false)

	// Effects
	useEffect(() => {
		(async () => {
			setOhmPrice(
				((await (
					await fetch("https://api.coingecko.com/api/v3/coins/olympus")
				).json())).market_data.current_price.usd
			)
		})()
	}, [])

	useEffect(() => {
		if (ohmPrice === 0 || borrowAmount === 0 || lendingAmount === 0) {
			setLiquidationPrice(0)
		} else {
			setLiquidationPrice(
				lendingAmount * ohmPrice * (1/collateralFactor) / ((lendingAmount*ohmPrice)/borrowAmount) / lendingAmount
			)
		}
	}, [lendingAmount, borrowAmount, ohmPrice, collateralFactor])

	// Update collateral factor each time a pool is changed
	useEffect(() => {
		setCollateralFactor(pool.collateralFactor)
	}, [pool])

	// Methods
	const numberFormatter = Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD"
	})

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
											setCollateralFactor(pool.collateralFactor)
										}}
									>{pool.collateralFactor}</a>
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
								<small className={"text-muted"}><small>Rari.capital Fuse</small></small>
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
										For the <a href={"https://app.rari.capital/fuse/pool/"+pool.id} target={"_blank"} rel="noreferrer" className={"text-muted"}>{pool.name}</a> pool (#{pool.id})
									</small>
								</p>
								<form action="#" method={"GET"}>
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label htmlFor="lendingAmount">
													How much OHM are you lending?
												</label>
												<div className="controls">
													<input
														type="text"
														pattern="[0-9]*"
														value={lendingAmount}
														onChange={event => setLendingAmount(Number(event.currentTarget.value.replace(/\D/,"")))}
														className="form-control"
													/>
													<p className="small text-muted mt-1">
														<small>
															Value (USD): {numberFormatter.format(((lendingAmount > 0 && ohmPrice > 0) ? (ohmPrice*lendingAmount) : 0))}
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
														type="text"
														pattern="[0-9]*"
														value={borrowAmount}
														onChange={event => setBorrowAmount(Number(event.currentTarget.value.replace(/\D/,"")))}
														className="form-control"
													/>
													<p className="small text-muted mt-1">
														<small>
															Borrow Limit (USD): {numberFormatter.format(((lendingAmount > 0 && ohmPrice > 0) ? (ohmPrice*lendingAmount)*collateralFactor : 0))}
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
													OHM Price:
												</p>
												<p className="lead">${ohmPrice} <small className={"text-muted"}>USD</small></p>
											</div>
										</div>
										<div className="col-md-6">
											<div className="text-center mt-4">
												<p className="small text-muted mb-2">
													Your Liquidation Price:
												</p>
												<p className="lead"><span title={liquidationPrice+" USD"}>${liquidationPrice.toFixed(2)} <small className={"text-muted"}>USD</small></span></p>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
						{!pool.verified && (
							<div
								className="card border-danger mt-4"
								style={{
									opacity: .75
								}}
							>
								<div className="card-header text-danger text-center">Beware!</div>
								<div className="card-body text-center lead">
									This pool is currently unverified on Rari.capital.
								</div>
							</div>
						)}
					</div>
				</div>
			</>
		</Default>
	)
}
