import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appLogo from "../statics/images/logo.png"
import search from "../statics/images/search_icon.png"
import { ConvertCase } from '../hooks/ConvertCase';
import { useIsMobile } from '../hooks/IsMobile';
import { FaBars, FaTimes } from 'react-icons/fa';

const headerMenus = [
	// { name: "scramble questions", link: "/scramble" },
	{ name: "scramble", link: "/scramble" },
	{ name: "take test", link: "/tests" },
	{ name: "contribute", link: "/contribute" },
	{ name: "contact us", link: "/contact" },
]

export default function Header () {
	const [menuOpen, setMenuOpen] = useState(false);
	const isMobile = useIsMobile();
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
			setMenuOpen(false);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY]);
	console.log({menuOpen})
	return (
		<header className={`top-header ${isVisible ? "show-header" : "hide-header"}`}>
			<nav className={`${!isMobile?'navbar':''} header-nav navbar-expand-lg`}
			style={{padding: '5px 0'}}>
				<div className={!isMobile?"container-fluid":"isMobile"}>
					<Link className="navbar-brand" to="/">
						<img src={appLogo} alt="images"/>
					</Link>
					{!isMobile ?
						<>
							<div className="collapse navbar-collapse justify-content-end header_menu" id="navbar-wd">
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
						<div
						className='hamburgerMenu'>
							<HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} location={location} />
						</div>
					}
				</div>
			</nav>
		</header>
	)
}

const HeaderMenu = (location) => {
	const isMobile = useIsMobile();
	return (
		<ul className="navbar-nav">
			{headerMenus.map((menu, index) => {
				const active = location.location === menu.link.split('/')[1]
				let newMenu = menu.name
				if (!isMobile && newMenu === 'scramble') {
					newMenu = 'scramble questions'
				}
				console.log(
					'\nlocation', location.location,
					'\nmenu.link', menu.link.split('/')[1],
					'\nactive', active,
				)
				return (
					<li key={index} className="nav-item">
						<Link
						className={`nav-link ${active ? "active" : ""}`} to={menu.link}>
							{ConvertCase(newMenu)}
						</Link>
					</li>
				)
			})}
		</ul>
	)
}

const HamburgerMenu = ({ menuOpen, setMenuOpen, location }) => {
	const iconSize = 27
	const menuRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
		  	// If menu is open AND the click is outside the menu container
			if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen, setMenuOpen]);
	return (
		<div ref={menuRef}>
			<div className="burger-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
				{menuOpen ?
					(<>
						<div style={{display: 'flex', justifyContent:'flex-end'}}>
							<FaTimes size={iconSize} />
						</div>
						<HeaderMenu location={location} />
					</>)
				:
					(<FaBars size={iconSize} color='#888' />)
				}
			</div>
		</div>
	);
};
