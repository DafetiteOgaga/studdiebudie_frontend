import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appLogo from "../statics/images/logo.png"
import search from "../statics/images/search_icon.png"
import { ConvertCase } from '../hooks/ConvertCase';
import { useIsMobile } from '../hooks/IsMobile';
import { FaBars, FaTimes } from 'react-icons/fa';

const headerMenus = [
	// { name: "scramble questions", link: "/scramble" },
	{ name: "home", link: "/" },
	{ name: "scramble", link: "/scramble" },
	{ name: "take test", link: "/tests" },
	{ name: "contribute", link: "/contribute" },
	{ name: "contact us", link: "/contact" },
]

export default function Header () {
	const [menuOpen, setMenuOpen] = useState(0);
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
			setMenuOpen(-1);
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
						<img src={appLogo} alt="images"/>
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
						<div
						className='hamburgerMenu'>
							<HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} location={location} lastScrollY={lastScrollY} />
						</div>
					}
				</div>
			</nav>
		</header>
	)
}

const HamburgerMenu = ({ menuOpen, setMenuOpen, location, lastScrollY }) => {
	const iconSize = 27
	// const [isCloseMenu, setIsCloseMenu] = useState(false);
	const menuRef = useRef(null);
	useEffect(() => {
		const handleClickOutside = (event) => {
		  	// If menu is open AND the click is outside the menu container
			if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
				setMenuOpen(0);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [menuOpen, setMenuOpen]);

	const handleMenuClicks = () => {
		setMenuOpen(prev => {
			let returnVal
			if (prev===1) returnVal = 0
			else if (prev===0) returnVal = 1
			else returnVal = 1
			// console.log('menuOpen from', prev, 'to', !prev);
			// setIsCloseMenu(prev);
			return returnVal
		});
	}
	const menuIndex = Number(menuOpen)
	const hamburgerColor = '#888'
	// console.log('\nisCloseMenu:', isCloseMenu);
	return (
		<div ref={menuRef}>
			<div className="burger-menu-icon" onClick={() => handleMenuClicks()}>
				<div className='menu_display'>
					{(menuOpen===1) ?
						<>
							<div style={styles.menuIconPostion}>
								<FaTimes size={iconSize} color={hamburgerColor} />
							</div>
						</>
						:
						(menuOpen===0) ?
						<>
							<div style={styles.menuIconPostion}>
								<FaBars size={iconSize} color={hamburgerColor} />
							</div>
						</>
						:
						<FaBars size={iconSize} color={hamburgerColor} />
					}
					<HeaderMenu location={location} index={menuIndex} menuOpen={menuOpen} />
				</div>
			</div>
		</div>
	);
};

const HeaderMenu = ({location, index, menuOpen}) => {
	const isMobile = useIsMobile();
	const menuSlides = ['slideOutMenuLeft', 'slideInMenuRight']
	// console.log(
	// 	'\nHeaderMenu index:', index,
	// 	'\nmenuOpen:', menuOpen,
	// 	'\nmenuSlides[index]:', menuSlides[index],
	// )
	return (
		<>
			{(menuOpen===-1)?null:
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

const styles = {
	menuIconPostion: {
		display: 'flex',
		justifyContent: 'flex-end'
	}
}
