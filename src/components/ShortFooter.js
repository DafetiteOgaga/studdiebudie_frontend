import { useEffect, useState } from "react";
import { DateHook } from "../hooks/DateHook";

export default function ShortFooter() {
	const {todayYear} = DateHook();
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
			<div className="footer_bottom">
				<div className="container">
					<div className="row">
						<div className="col-12">
							<p className="crp">© Copyrights {todayYear} - Developed by Dafetite</p>
						</div>
					</div>
				</div>
			</div>

			{lastScrollY ? <a href="#home" id="scroll-to-top" className="hvr-radial-out"><i className="fa fa-angle-up"></i></a>: null}
		</>
	)
}