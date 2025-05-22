import React, { useEffect, useState } from "react";
import Banner from "./Banner";
import SectionBar from "./SectionBar";
import WelcomeSection from "./WelcomeSection"
import * as Ficons from "react-icons/fa";
import { useIsMobile } from "../hooks/IsMobile";

export default function Home() {
	const isMobile = useIsMobile();
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
		<>
			<Banner />
			{!isMobile && <SectionBar />}
			<WelcomeSection />
		</>
	);
}
