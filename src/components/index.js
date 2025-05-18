import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import SectionBar from "./SectionBar";
import WelcomeSection from "./WelcomeSection"
import * as Ficons from "react-icons/fa";

export default function Home() {
	// console.log(Ficons)
	const [lastScrollY, setLastScrollY] = useState(0);
	useEffect(() => {
		const handleScroll = () => {
			setLastScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	return (
		<div id="home">
			<Banner />
			<SectionBar />
			<WelcomeSection />
		</div>
	);
}
