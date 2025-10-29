import { DafetiteFooter } from "../hooks/dafetiteFooter/dafetiteFooter";

export default function Footer() {
	return (
		<>
			<div className="footer_bottom">
				<div className="container">
					<div className="row">
						<div className="col-12 text-center">
							{/* <p className="crp">&copy; Copyrights {todayYear} - Developed by
								<a href="https://dafetiteogaga.github.io/dafetite/"><img src={dafetite} alt="dafetite" className="dafetite" /></a>
							</p> */}
							<DafetiteFooter />
						</div>
					</div>
				</div>
			</div>

			{/* {lastScrollY ? <a href="#home" id="scroll-to-top" className="hvr-radial-out"><i className="fa fa-angle-up"></i></a>: null} */}
		</>
	)
}