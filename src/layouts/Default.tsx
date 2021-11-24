import React from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

interface Props {
	className?: string
    children: JSX.Element
}

export default function Default(props: Props): JSX.Element {
	return (
		<div className={props?.className || ""}>
			<Navbar />
			<main className="content">
				<div className="container">
					{props.children}
				</div>
			</main>
			<Footer />
		</div>
	)
}