// import { useEffect, useState } from "react";
import { DateHook } from "../hooks/DateHook";
import dafetite from "../statics/images/dafelogoWhiteTransparent.png"

export default function ShortFooter() {
	const {todayYear} = DateHook();
	// const [lastScrollY, setLastScrollY] = useState(0);
	// useEffect(() => {
	// 	const handleScroll = () => {
	// 		setLastScrollY(window.scrollY);
	// 	};

	// 	window.addEventListener("scroll", handleScroll);
	// 	return () => window.removeEventListener("scroll", handleScroll);
	// }, [lastScrollY]);
	return (
		<>
			<div className="footer_bottom">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<p className="crp">&copy; Copyrights {todayYear} - Developed by
								<a href="https://dafetiteogaga.github.io/dafetite/"><img src={dafetite} alt="dafetite" className="dafetite" /></a>
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* {lastScrollY ? <a href="#home" id="scroll-to-top" className="hvr-radial-out"><i className="fa fa-angle-up"></i></a>: null} */}
		</>
	)
}