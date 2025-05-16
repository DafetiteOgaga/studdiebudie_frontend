import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appLogo from "../statics/images/logo.png"
import search from "../statics/images/search_icon.png"
import { ConvertCase } from '../hooks/ConvertCase';

export default function Header () {
	const location = useLocation().pathname.split("/")[1];
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	// const [activeSection, setActiveSection] = useState("#home");
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > lastScrollY) {
				// If scrolling down, hide header
				setIsVisible(false);
			} else {
				// If scrolling up, show header
				setIsVisible(true);
			}
			setLastScrollY(window.scrollY);
		};
	
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	// useEffect(() => {
	// 	// Intersection Observer to detect which section is visible
	// 	const sections = document.getElementsByClassName("section");
	// 	console.log({sections})
	// 	const observer = new IntersectionObserver(
	// 		(entries) => {
	// 			const visibleSection = entries.find((entry) => entry.isIntersecting);
	// 			// console.log('visibleSection:', visibleSection.target.id)
	// 			if (visibleSection) {
	// 				setActiveSection(`#${visibleSection.target.id}`);
	// 			}
	// 		},
	// 		{ threshold: 0.5 }
	// 	);

	// 	sections.forEach((section) => observer.observe(section));

	// 	return () => sections.forEach((section) => observer.unobserve(section));
	// });
	// console.log({ isVisible, lastScrollY, location });
	const headerMenus = [
		{ name: "home", link: "/" },
		{ name: "history", link: "#" },
		{ name: "scramble questions", link: "/scramble" },
		{ name: "take test", link: "/tests" },
		{ name: "contribute", link: "/contribute" },
		{ name: "contact us", link: "/contact" },
	]
	// console.log('location:', location)
	return (
		<header className={`top-header ${isVisible ? "show-header" : "hide-header"}`}
		// style={{backgroundColor: lastScrollY ? null:"white"}}
		>
			<nav className="navbar header-nav navbar-expand-lg">
				<div className="container-fluid">
					<Link className="navbar-brand" to="#">
						<img src={appLogo} alt="images"/>
					</Link>
					<div className="collapse navbar-collapse justify-content-end header_menu" id="navbar-wd">
						<ul className="navbar-nav">
							{headerMenus.map((menu, index) => {
								// console.log(
								// 	'\nlocation:', location,
								// 	'\nmenu.link:', menu.link,
								// 	'\nlocation === menu.link:', location === menu.link,
								// )
								return (
									<li key={index} className="nav-item">
										<Link className={`nav-link ${location === menu.link.split('/')[1] ? "active" : ""}`} to={menu.link}>
											{ConvertCase(menu?.name)}
										</Link>
									</li>
								)
							})}
						</ul>
					</div>
					<div className="search-box">
						<input type="text" className="search-txt" placeholder="Search"/>
						<a href="#s" className="search-btn">
							<img src={search} alt="#" />
						</a>
					</div>
				</div>
			</nav>
		</header>
	)
}