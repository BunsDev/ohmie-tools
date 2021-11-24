import React from "react"

export default function Footer(): JSX.Element {
	return (
		<div className={"site-footer"}>
			<div className="copyright">
				<div className="container">
					<p className="small text-center text-muted">
						<small>
							This is experimental software. Please use with caution.
							<br/>
							Github: <a href="https://github.com/0xAndreasLewis/ohmie-tools" target={"_blank"} rel="noreferrer" className={"text-muted"}>0xAndreasLewis/ohmie-tools</a>
						</small>
					</p>
				</div>
			</div>
		</div>
	)
}