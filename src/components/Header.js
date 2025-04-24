import React, { useEffect, useState } from 'react';
import appLogo from "../statics/images/logo.png"
import search from "../statics/images/search_icon.png"

export default function Header () {
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
	const [activeSection, setActiveSection] = useState("#home");
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
	useEffect(() => {
		// Intersection Observer to detect which section is visible
		const sections = document.querySelectorAll("section");
		const observer = new IntersectionObserver(
			(entries) => {
				const visibleSection = entries.find((entry) => entry.isIntersecting);
				if (visibleSection) {
				setActiveSection(`#${visibleSection.target.id}`);
				}
			},
			{ threshold: 0.5 }
		);
	
		sections.forEach((section) => observer.observe(section));
	
		return () => sections.forEach((section) => observer.unobserve(section));
	}, []);
	console.log({ isVisible, lastScrollY, activeSection });
	return (
		<header className={`top-header ${isVisible ? "show-header" : "hide-header"}`}
		style={{backgroundColor: lastScrollY ? null:"white"}}>
			<nav className="navbar header-nav navbar-expand-lg">
				<div className="container-fluid">
					<a className="navbar-brand" href="index.html">
						<img src={appLogo} alt="images"/>
					</a>
					<div className="collapse navbar-collapse justify-content-end" id="navbar-wd">
						<ul className="navbar-nav">
							{/* <li><a className="nav-link active" href="index.html">Home</a></li> */}
							{/* <li><a className="nav-link" href="about.html">About</a></li> */}
							<li><a className="nav-link" href="contact.html">Contact us</a></li>
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