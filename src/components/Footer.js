import footer from "../statics/images/footer_logo.png"
import i5 from "../statics/images/i5.png"
import i6 from "../statics/images/i6.png"
import i7 from "../statics/images/i7.png"

export default function Footer() {
	return (
		<footer className="footer-box">
					<div className="container">
					
						<div className="row"
						style={{display: "flex", justifyContent: "space-between"}}>
						
							{/* <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
								<div className="footer_blog">
									<div className="full margin-bottom_30">
										<img src={footer} alt="#" />
									</div>
									<div className="full white_fonts">
										<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
										Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip </p>
									</div>
								</div>
							</div> */}
							
							<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
								<div className="footer_blog footer_menu white_fonts">
											<h3>Quick links</h3>
											<ul> 
											<li><a href="#s"> Join Us</a></li>
											<li><a href="#s"> Maintenance</a></li>
											<li><a href="#s"> Language Packs</a></li>
											<li><a href="#s"> LearnPress</a></li>
											<li><a href="#s"> Release Status</a></li>
											</ul>
										</div>
								</div>
								
								<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
								<div className="footer_blog full white_fonts">
											<h3>Newsletter</h3>
											<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do</p>
											<div className="newsletter_form">
												<form action="index.html">
												<input type="email" placeholder="Your Email" name="#" required />
												<button>Submit</button>
												</form>
											</div>
										</div>
									</div>	 
							
							<div className="col-xs-12 col-sm-6 col-md-6 col-lg-3">
								<div className="footer_blog full white_fonts">
											<h3>Contact us</h3>
											<ul className="full">
											<li><img src={i5} alt="images"/><span>London 145<br/>United Kingdom</span></li>
											<li><img src={i6} alt="images"/><span>demo@gmail.com</span></li>
											<li><img src={i7} alt="images"/><span>+12586954775</span></li>
											</ul>
										</div>
									</div>	 
							
						</div>
					
					</div>
				</footer>
	)
}