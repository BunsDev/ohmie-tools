import React from "react"

export default function Footer(): JSX.Element {
	return (
		<div className={"site-footer pb-3"}>
			<div className="copyright">
				<div className="container">
					<p className="small text-center text-muted mb-2">
						Remember to double check the configuration variables of the pools you&apos;re calculating for. Pool variables can change, and sometimes the changes will be delayed on ohmie.tools, since it&apos;s handled manually. If you ever spot a variable that is not updated, please feel free to open an issue or a PR using the Github repository linked below.
					</p>
					<p className="small text-center text-muted">
						<br/>
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
