import React from "react"
import { Link } from "react-router-dom"
import { NavDropdown, Navbar as BSNavbar } from "react-bootstrap"

export default function Navbar(): JSX.Element {
	return (
		<BSNavbar expand="lg" variant={"dark"}>
			<div className="container-fluid">
				<BSNavbar.Brand href="#home">ohmie.tools</BSNavbar.Brand>
				<BSNavbar.Toggle aria-controls="basic-navbar-nav" />
				<BSNavbar.Collapse id={"basic-navbar-nav"}>
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link to="/" className="nav-link">Home</Link>
						</li>
						<NavDropdown title="Rari Fuse">
							<Link to="/tools/fuse/6" className="nav-link">
								Pool #6
								<br />
								<small className={"text-muted"}>
									<small>Tetranode&apos;s Locker</small>
								</small>
							</Link>
							<Link to="/tools/fuse/18" className="nav-link">
								Pool #18
								<br />
								<small className={"text-muted"}>
									<small>Olympus Pool Party</small>
								</small>
							</Link>
							<Link to="/tools/fuse/36" className="nav-link">
								Pool #36
								<br />
								<small className={"text-muted"}>
									<small>Fraximalist Money Market</small>
								</small>
							</Link>
						</NavDropdown>
						<NavDropdown title="Market.xyz">
							<Link to="/market-xyz/polygon/pool/5" className="nav-link">
								Pool #5
								<br />
								<small className={"text-muted"}>
									<small>Green Leverage Locker</small>
								</small>
							</Link>
						</NavDropdown>
					</ul>
				</BSNavbar.Collapse>
			</div>
		</BSNavbar>
	)
}
