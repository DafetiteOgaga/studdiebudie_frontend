import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import appLogo from "../statics/images/dafelogoWhiteTransparent.png"
import search from "../statics/images/search_icon.png"
import { ConvertCase } from '../hooks/ConvertCase';
import { useIsMobile } from '../hooks/IsMobile';

const headerMenus = [
	// { name: "scramble questions", link: "/scramble" },
	{ name: "home", link: "/" },
	// { name: "scramble", link: "/scramble" },
	{ name: "scramble questions", link: "/scramble" },
	{ name: "take test", link: "/tests" },
	{ name: "contribute", link: "/contribute" },
	// { name: "contact us", link: "/contact" },
	{ name: "score board", link: "#" },
	{ name: "contact us", link: "#" },
]

export default function Header () {
	const [menuOpen, setMenuOpen] = useState(null);
	const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
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
			if (window.scrollY > 0) {
				setMenuOpen(false)
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [lastScrollY, menuOpen]);
	useEffect(() => {
		if (menuOpen) {
			setShouldRenderMenu(true);
		} else {
			// start closing animation, then unmount after delay
			const timer = setTimeout(() => {
				setShouldRenderMenu(false);
			}, 500); // matches animation duration in responsive.css
			return () => clearTimeout(timer);
		}
	}, [menuOpen]);
	const mobileHeaderMenu = () => {
		setMenuOpen(prev => !prev)
	}
	console.log('ismenuopen:', menuOpen)
	return (
		<header className={`top-header ${isVisible ? "show-header" : "hide-header"}`}>
			<nav className={`${!isMobile?'navbar':''} header-nav navbar-expand-lg`}
			style={{padding: '5px 0'}}>
				<div className={!isMobile?"container-fluid navC":"isMobile"}>
					<Link className="navbar-brand" style={{zIndex: 1000}}
					onClick={isMobile?mobileHeaderMenu:null}
					to={`${!isMobile?"/":"#"}`}>
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
				{shouldRenderMenu &&
					<div
					className={menuOpen ? 'slideMenuOutReveal' : 'slideMenuInHide'}
					style={styles.mobileHeaderMenu}
					onClick={()=>menuOpen&&setMenuOpen(false)}
					>
						<HeaderMenu location={location} />
					</div>}
			</nav>
		</header>
	)
}

const HeaderMenu = ({location, index}) => {
	const isMobile = useIsMobile();
	const menuSlides = ['slideOutMenuLeft', 'slideInMenuRight']
	const maxTextLength = 13;
	const marginTop = {
		scoreBoard: '50%',
		contactUs: '180%',
	}
	return (
		<>
			{
			<ul className={`navbar-nav ${menuSlides[index]} headerMaxHeight`}>
				{headerMenus.map((menu, index) => {
					const active = location === menu.link.split('/')[1]
					let newMenu = menu.name
					// if (!isMobile && newMenu === 'scramble') {
					// 	newMenu = 'scramble questions'
					// }
					const scoreBoard = headerMenus.length - 2 === index
					const contactUs = headerMenus.length - 1 === index
					return (
						<>
							{isMobile&&(scoreBoard||contactUs) &&
							<div style={{
								display: 'flex',
								justifyContent: 'center',
							}}>
								<div
									style={{
									height: '2px',
									backgroundColor: 'black',
									width: '80%',
									marginTop: scoreBoard?marginTop.scoreBoard:contactUs?marginTop.contactUs:null,
									// margin: '1px 0',
									}}
								/>
							</div>}
							<li key={index} className="nav-item">
								<Link
								style={{
									borderTopRightRadius: !index?15:null,
									padding: isMobile?`10px 20px`:null,
									// marginTop: isMobile&&scoreBoard?marginTop.scoreBoard:isMobile&&contactUs?marginTop.contactUs:null,
								}}
								className={`nav-link ${active ? "selectedMenu" : ""}`} to={menu.link}>
									<>
										{`${ConvertCase(newMenu).slice(0, maxTextLength)}${newMenu.length > maxTextLength ? '...' : ''}`}
									</>
								</Link>
							</li>
						</>
					)
				})}
			</ul>}
		</>
	)
}
const styles = {
	mobileHeaderMenu: {
		background: '#0000009e',
		padding: '20% 0',
		margin: '-20% 0',
	}
}
