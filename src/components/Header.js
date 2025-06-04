import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appLogo from "../statics/images/dafelogoWhiteTransparent.png"
import search from "../statics/images/search_icon.png"
import { ConvertCase } from '../hooks/ConvertCase';
import { useIsMobile } from '../hooks/IsMobile';

const headerMenus = [
	// { name: "scramble questions", link: "/scramble" },
	{ name: "home", link: "/" },
	{ name: "scramble", link: "/scramble" },
	{ name: "take test", link: "/tests" },
	{ name: "contribute", link: "/contribute" },
	// { name: "contact us", link: "/contact" },
	{ name: "contact us", link: "#" },
	{ name: "score board", link: "#" },
]

export default function Header () {
	// const [menuOpen, setMenuOpen] = useState(-1);
	const isMobile = useIsMobile();
	const location = useLocation().pathname.split("/")[1];
	const [isVisible, setIsVisible] = useState(true);
	const [lastScrollY, setLastScrollY] = useState(0);
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
			// setMenuOpen(-1);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	// console.log({menuOpen})
	return (
		<header className={`top-header ${isVisible ? "show-header" : "hide-header"}`}>
			<nav className={`${!isMobile?'navbar':''} header-nav navbar-expand-lg`}
			style={{padding: '5px 0'}}>
				<div className={!isMobile?"container-fluid navC":"isMobile"}>
					<Link className="navbar-brand" to="/">
						<img className='dafetiteHeader' src={appLogo} alt="images"/>
					</Link>
					{!isMobile ?
						<>
							<div className="justify-content-end header_menu" id="navbar-wd">
								<HeaderMenu location={location} />
							</div>
							<div className="search-box">
								<input type="text" className="search-txt" placeholder="Search"/>
								<a href="#s" className="search-btn">
									<img src={search} alt="#" />
								</a>
							</div>
						</>
						:
						null}
				</div>
			</nav>
		</header>
	)
}

const HeaderMenu = ({location, index}) => {
	const isMobile = useIsMobile();
	const menuSlides = ['slideOutMenuLeft', 'slideInMenuRight']
	return (
		<>
			{
			// (menuOpen===-1)?null:
			<ul className={`navbar-nav ${menuSlides[index]} headerMaxHeight`}>
				{headerMenus.map((menu, index) => {
					const active = location === menu.link.split('/')[1]
					let newMenu = menu.name
					if (!isMobile && newMenu === 'scramble') {
						newMenu = 'scramble questions'
					}
					const last = headerMenus.length - 1 === index
					return (
						<li key={index} className="nav-item">
							<Link
							style={{
								borderTopLeftRadius: !index?15:null,
								padding: isMobile?`15px 30px`:null,
								marginTop: isMobile&&last?'310%':null,
							}}
							className={`nav-link ${active ? "active" : ""}`} to={menu.link}>
								{ConvertCase(newMenu)}
							</Link>
						</li>
					)
				})}
			</ul>}
		</>
	)
}
