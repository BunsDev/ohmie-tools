import React from "react"
import Default from "../layouts/Default"
import { Link } from "react-router-dom"

export default function Home(): JSX.Element {
	return (
		<Default>
			<>
				<div className="py-4 text-center">
					<h1>ohmie.tools for the ohmies!</h1>
					<p className={"lead"}>
						ohmie.tools is an open source project building simple tools for ohmies. (3, 3)
					</p>
					<div className="row justify-content-center mt-4 mb-5">
						<div className="col-md-10 col-lg-8 col-xl-6">
							<div className="card">
								<div className="card-header">Tools Available</div>
								<div className="list-group list-group-flush text-start">
									<div className="list-group-item text-muted">
										Calculators
									</div>
									<div className="list-group-item">
										<small className={"text-muted"}>
											Rari.capital Fuse
										</small>
									</div>
									<Link to="/tools/fuse/6" className="list-group-item">
										&rarr; Liquidation Price <small className="text-muted">Pool #6 (Tetranode&apos;s Locker)</small>
									</Link>
									<Link to="/tools/fuse/18" className="list-group-item">
										&rarr; Liquidation Price <small className="text-muted">Pool #18 (Olympus Pool Party)</small>
									</Link>
									<Link to="/tools/fuse/36" className="list-group-item">
										&rarr; Liquidation Price <small className="text-muted">Pool #36 (Fraximalist Money Market)</small>
									</Link>
									<div className="list-group-item">
										<small className={"text-muted"}>
											Market.xyz
										</small>
									</div>
									<Link to="/market-xyz/polygon/pool/5" className="list-group-item">
										&rarr; Liquidation Price <small className="text-muted">Pool #5 (Green Leverage Locker)</small>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<h2>become an ohmie <small>(3, 3)</small></h2>
					<p className="lead">
						<a href="https://discord.gg/olympusdao" target={"_blank"} rel="noreferrer" className={"btn btn-sm btn-primary mt-2"}>Join OlympusDAO</a>
					</p>
				</div>
			</>
		</Default>
	)
}
